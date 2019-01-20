import { normalUtil, httpValidate } from '../utils';
import { spiderService, workConfigService, scheduleService } from '../services';

const {packData, validator, deepClone, redirectData, getUserAgent} = normalUtil;

async function getList (ctx) {
    try {
        const list = deepClone(await workConfigService.findAll());
        let data = [];
        if (list) {
            data = list.map(v => {
                const config = JSON.parse(v.config);
                config.id = v.id;
                return config;
            });
        }
        return packData(200, 'success', data);
    } catch (e) {
        console.log(e);
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
}

async function startSpider (ctx) {
    try {
        const params = ctx.params;
        const request = ctx.request.body;
        const scheduleMap = ctx.scheduleMap;
        httpValidate(request, {
            config: 'required'
        });

        const config = JSON.parse(request.config);
        // 创建定时任务
        const data = await workConfigService[params.id ? 'update' : 'create']({config: JSON.stringify(config)}, {id: config.id});
        if (!config.id) {
            config.id = data.id;
        }
        if (config.isDelayed && !scheduleMap.has(config.id)) {
            scheduleService.create(ctx, config);
        }
        const result = await spiderService.useConfig(ctx, config);

        return packData(200, 'success', result);
    } catch (e) {
        console.log(e);
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }

}

const remove = async function (ctx) {
    const params = ctx.params;
    try {
        const config = await workConfigService.delete({id: params.id});
        return packData(200, 'success', config);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

async function saveAll (ctx) {
    try {
        const request = ctx.request.body;
        httpValidate(request, {
            configs: 'required'
        });
        const configs = JSON.parse(request.configs);
        const allPromise = configs.map(config => {
            return workConfigService[config.id ? 'update' : 'create']({config: JSON.stringify(config)}, {id: config.id});
        });
        const result = await Promise.all(allPromise);
        return packData(200, 'success', result);
    } catch (e) {
        console.log(e);
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
}

export default {
    saveAll, remove, startSpider, getList
};