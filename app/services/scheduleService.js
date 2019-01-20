import schedule from 'node-schedule';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import { fileUtil } from '../utils';
import compressing from 'compressing';
import { workConfigService, spiderService } from './index';

const scheduleService = {
    getData: async function (ctx, id) {
        const map = ctx.scheduleMap;
        let data = map.get(id);
        if (!data) {
            data = await workConfigService.findOne({id: id});
        } else {
            data = data.config;
        }
        return data;
    },
    create: function (ctx, config) {
        const {isDelayed, delayedTime} = config;
        const map = ctx.scheduleMap;
        const timeRules = this.getCronRules(delayedTime);
        const event = schedule.scheduleJob(timeRules, async () => {
            const data = await spiderService.useConfig(ctx, config);
            const result = map.get(config.id);
            if (!result.config.cnt) {
                scheduleService.removeFiles(ctx, config);
            }
            result.config.cnt += 1;
            result.data[result.config.cnt] = {html: data.html, resultList: data.resultList};
            map.set(config.id, result);
            await scheduleService.saveByFile(ctx, result.data[result.config.cnt], result.config);
        });
        config.cnt = 0;
        map.set(config.id, {config, schedule: event, data: {}});
    },
    saveByFile: function (ctx, data, config) {
        const {html, resultList} = data;
        const lastPath = ctx._dir_path;
        const firstPath = `public/download/${config.id}`;
        const orgPath = path.resolve(lastPath, firstPath);
        if (!fs.existsSync(orgPath)) {
            fileUtil.mkDirSync(firstPath, lastPath)();
        }

        const htmlPath = path.resolve(orgPath, `html_${config.id}_${config.cnt}.html`);
        const jsonPath = path.resolve(orgPath, `json_${config.id}_${config.cnt}.json`);
        fs.writeFileSync(htmlPath, html);
        fs.writeFileSync(jsonPath, JSON.stringify(resultList, null, 4));
    },
    zipFiles: async function (ctx, config) {
        const lastPath = ctx._dir_path;
        const firstPath = `public/download/${config.id}`;
        const orgPath = path.resolve(lastPath, firstPath);
        const data = [];
        if (fs.existsSync(orgPath)) {
            return new Promise((reslove, reject) => {
                const stream = new compressing.zip.Stream();
                stream.addEntry(orgPath);
                stream.on('data', function (chunk) {
                    data.push(chunk);
                });
                stream.on('end', function () {
                    const finalData = Buffer.concat(data); // 合并Buffer
                    reslove(finalData);
                });
                stream.on('error', (err) => {
                    reject(err);
                });
            });
        }
    },
    removeFiles: function (ctx, config) {
        const lastPath = ctx._dir_path;
        const firstPath = `public/download/${config.id}`;
        const orgPath = path.resolve(lastPath, firstPath);
        if (fs.existsSync(orgPath)) {
            fs.rmdirSync(orgPath);
        }
    },
    cancel: function (ctx, id) {
        id = Number(id);
        const map = ctx.scheduleMap;
        const result = map.get(id);
        result.schedule.cancel();
        map.delete(id);
    },
    taskList: function (ctx) {
        const map = ctx.scheduleMap;
        return [...map.values()].map(val => val.config);
    },
    getCronRules: function (delayedTime) {
        let rules = null;
        const m = moment();
        const second = m.second();
        const minute = m.minute();
        const hour = m.hour();
        const date = m.date();
        const month = m.month();
        const day = m.day();
        switch (delayedTime) {
            case '5sec':
                rules = `*/5 * * * * *`;
                break;
            case '5min':
                rules = `${second} */5 * * * *`;
                break;
            case '15min':
                rules = `${second} */15 * * * *`;
                break;
            case 'halfhour':
                rules = `${second} */30 * * * *`;
                break;
            case 'hour':
                rules = `${second} ${minute} */1 * * *`;
                break;
            case 'halfday':
                rules = `${second} ${minute} */12 * * *`;
                break;
            case 'day':
                rules = `${second} ${minute} ${hour} * * * `;
                break;
            case 'week':
                rules = `${second} ${minute} ${hour} * * ${day} `;
                break;
            default:
                break;
        }
        return rules;
    }

};

export default scheduleService;