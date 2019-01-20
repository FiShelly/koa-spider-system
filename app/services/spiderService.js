import request from 'superagent';
import proxyRequest from 'superagent-proxy';
import { normalUtil } from '../utils';
import cheerio from 'cheerio';
import nodeUrlModule from 'url';

proxyRequest(request);
const {getUserAgent} = normalUtil;

const spiderService = {
    create: function (url, proxy) {
        const userAgent = getUserAgent();
        return request.get(url)
            .set({'User-Agent': userAgent})
            .timeout({response: 12000, deadline: 60000})
            .proxy(proxy);
    },
    useConfig: async function (ctx, config) {
        const {url, resultType, advance, related, isDelayed, isUseProxy, delayedTime} = config;
        const urlParams = nodeUrlModule.parse(url);
        let proxyIp = null;
        if (isUseProxy) {
            proxyIp = await this.getProxyIp(ctx);
        }
        const resultList = [];
        try {
            const data = await this.create(url, proxyIp ? proxyIp.full : undefined);
            const $ = cheerio.load(data.res.text, {decodeEntities: false});
            switch (resultType) {
                case 'img':
                    $('img').each((idx, val) => {
                        const $val = $(val);
                        resultList.push({
                            img: $val.attr('src')
                        });
                    });
                    break;
                case 'relate':
                    $(`:contains(${related})`).siblings().each((idx, val) => {
                        const $val = $(val);
                        resultList.push({
                            related_text: $val.text(),
                            related_html: $val.html()
                        });
                    });
                    break;
                case 'advance':
                    const advanceSelector = {};
                    advance.forEach(val => {
                        advanceSelector[val.key] = [];
                        $(val.selector).each((idx, sel) => {
                            advanceSelector[val.key].push($(sel).html());
                        });
                    });
                    Object.keys(advanceSelector).forEach((akey) => {
                        advanceSelector[akey].forEach((res, idx) => {
                            const obj = resultList[idx] || {};
                            obj[akey] = res;
                            resultList[idx] = obj;
                        });
                    });
                    break;
                case 'link':
                default:
                    $('a').each((idx, val) => {
                        const $val = $(val);
                        let href = $val.attr('href');
                        if (!href.includes('http')) {
                            href = `${urlParams.protocol}//${urlParams.host}${href}`;
                        }
                        resultList.push({
                            link: href
                        });
                    });
                    break;
            }
            config.html = data.res.text;
            config.resultList = resultList;
            return config;
        } catch (e) {
            console.log(e);
        }
    },
    getProxyIp: async function (ctx) {
        const ips = await this.getProxyIps(ctx);
        return ips[parseInt(Math.random() * ips.length)];
    },
    getProxyIps: async function (ctx) {
        const cacheIps = ctx.cache.get('proxyList');
        if (cacheIps) {
            return cacheIps;
        }
        const data = await this.create(ctx._server_config.proxyUrl);
        const $ = cheerio.load(data.res.text, {decodeEntities: false});
        const proxyList = [];
        const $tbody = $('.table-responsive .table tbody');
        $tbody.find('tr').each((idx, tr) => {
            const $tr = $(tr);
            const $tds = $tr.find(`td`);
            const ip = $tds.eq(0).html();
            const port = $tds.eq(1).html();
            const response_time = $tds.eq(2).html();
            const location = $tds.eq(3).html();
            const last_validate = $tds.eq(4).html();
            const type = 'http';
            proxyList.push({
                ip, port, type, full: `${type}://${ip}:${port}`, response_time, location, last_validate
            });
        });
        ctx.cache.set('proxyList', proxyList, 60 * 60);
        return proxyList;
    },
    getProxyIpList: async function (ctx) {
        const ips = await this.getProxyIps(ctx);
        const url = ctx._server_config.proxyUrl;
        return {list: ips, url};
    }
};

export default spiderService;