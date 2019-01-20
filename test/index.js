// import phantom from 'phantom';
//
// (async function() {
//     const instance = await phantom.create();
//     const page = await instance.createPage();
//     await page.on('onResourceRequested', function(requestData) {
//         console.info('Requesting', requestData.url);
//     });
//
//     const status = await page.open('https://blog.fishelly.top/article');
//     const content = await page.property('content');
//     console.log(content);
//
//     await instance.exit();
// })();

// import axios from 'axios';
// import cheerio from 'cheerio';
import { spiderController } from '../app/controllers';

const cheerio = require('cheerio');
const axios = require('axios');
import { scheduleService, spiderService, workConfigService } from '../app/services';
import { Cache, normalUtil } from '../app/utils';

const {deepClone} = normalUtil;

const getBreeds = async () => {
    try {
        return await axios.request({
            method: 'get',
            url: 'https://blog.fishelly.top/article',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
            },
        });
    } catch (error) {
        console.error(error);
    }
};

const getProxyIps = async () => {
    const data = await spiderService.create('http://ip.seofangfa.com/');
    const $ = cheerio.load(data.res.text, {decodeEntities: false});
    const proxyList = [];
    const $tbody = $('.table-responsive .table tbody');
    $tbody.find('tr').each((idx, tr) => {
        const $tr = $(tr);
        const ip = $tr.find(`td`).eq(0).html();
        const port = $tr.find(`td`).eq(1).html();
        const type = 'http';
        proxyList.push({
            ip, port, type, full: `${type}://${ip}:${port}`
        });
    });
    console.log(proxyList);
    try {
        const testData = await spiderService.create('https://blog.fishelly.top', 'http://42.55.255.221:1133');
        console.log(testData.res.text);
    } catch (e) {
        console.log(e);
    }
};

async function testSpider () {
    const config = {
        url: 'https://blog.fishelly.top/article',
        resultType: 'advance',
        related: '依赖注入',
        // isDelayed: true,
        // delayedTime: '10sec',
        // isUseProxy: true,
        id: 11,
        advance: [
            {
                key: 'img',
                selector: '.blog-item img'
            },
            {
                key: 'abstract',
                selector: '.blog-item .title > h3'
            },
            {
                key: 'title',
                selector: '.blog-item .blog-title'
            },
            {
                key: 'time',
                selector: '.blog-item .blog-date'
            }

        ]
    };
    const data = await spiderController.startSpider({
        params: {
            id: 11
        },
        request: {
            body: {
                config: JSON.stringify(config)
            }
        }
    });

    scheduleService.saveByFile({
        _dir_path: process.cwd()
    }, {html: data.data.html, resultList: data.data.resultList}, data.data);

}

const countBreeds = async () => {
    const breeds = await getBreeds();
    const $ = cheerio.load(breeds.data, {decodeEntities: false});
    const $items = $('.blog-item');
    $items.each((idx, val) => {
        const $val = $(val);
        const obj = {};
        obj.img = $val.find('img').attr('src');
        obj.abstract = $val.find('.title > h3').html();
        obj.title = $val.find('.blog-title').html();
        obj.time = $val.find('.blog-date').html();
        obj.commentCnt = $val.find('.blog-footer .ng-binding').eq(0).html();
        obj.viewCnnt = $val.find('.blog-footer .ng-binding').eq(1).html();
        console.log(obj);
    });
};

const addWorkConfig = async () => {
    const data = await workConfigService.create({
        config: JSON.stringify({
            url: '111https://blog.fishelly.top/article',
            resultType: 'advance',
            related: '依赖注入',
            advance: [
                {
                    key: 'img',
                    selector: '.blog-item img'
                },
                {
                    key: 'abstract',
                    selector: '.blog-item .title > h3'
                },
                {
                    key: 'title',
                    selector: '.blog-item .blog-title'
                },
                {
                    key: 'time',
                    selector: '.blog-item .blog-date'
                },
                {
                    key: 'commentCnt',
                    selector: '.blog-item .blog-footer .ng-binding:eq(0)'
                },
                {
                    key: 'viewCnt',
                    selector: '.blog-item .blog-footer .ng-binding:eq(1)'
                }

            ]
        })
    });
    console.log(data.id, data.dataValues.id);
};

// addWorkConfig();

testSpider();

// getProxyIps();

// countBreeds();