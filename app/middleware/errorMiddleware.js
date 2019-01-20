import { readFileSync } from 'fs';
import { join } from 'path';

let template = null;
if (!template) {
    template = readFileSync(join(process.cwd(), 'public/error', 'index.html')).toString();
}

function renderError (obj) {
    return async function (ctx, next) {
        ctx.type = 'html';
        ctx.body = template.replace('${TITLE}', obj.title).replace('${MSG}', obj.msg);
    };
}

async function tryCatchMiddleware (ctx, next) {
    try {
        await next();
    } catch (e) {
        ctx.status = e.status || 500;
        await errorHandleMiddleware(ctx);
        //触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
        if (ctx.status === 500) {
            ctx.app.emit('error', e, ctx);
        }
    }
}

async function errorHandleMiddleware (ctx, next) {
    let handle = null;
    let status = ctx.status;
    // 根据 status 渲染不同的页面
    if (status === 403) {
        switch (ctx.accepts('html', 'json')) {
            case 'html':
                handle = renderError({title: '403 未授权.', msg: '403！抱歉，您没有访问权限~~'});
                await handle(ctx);
                break;
            case 'json':
                ctx.status = 200;
                ctx.body = {
                    code: 403,
                    status: 'error',
                    msg: 'CSRF TOKEN或其他TOKEN不匹配'
                };
                break;
            default:
                ctx.type = 'text';
                ctx.body = 'CSRF TOKEN或其他TOKEN不匹配';
        }
    } else if (ctx.status === 404) {
        ctx.status = 404;
        switch (ctx.accepts('html', 'json')) {
            case 'html':
                handle = renderError({title: '404 您访问的页面不存在.', msg: '404！抱歉，您查看的页面不存在～～'});
                await handle(ctx);
                break;
            case 'json':
                ctx.status = 200;
                ctx.body = {
                    code: 404,
                    status: 'error',
                    msg: '您访问的页面不存在'
                };
                break;
            default:
                ctx.type = 'text';
                ctx.body = 'Page Not Found';
        }
    } else if (status === 500) {
        switch (ctx.accepts('html', 'json')) {
            case 'html':
                handle = renderError({title: '500 服务器出错.', msg: '500！抱歉，服务器出错，请稍后再访问～～'});
                await handle(ctx);
                break;
            case 'json':
                ctx.status = 200;
                ctx.body = {
                    code: 500,
                    status: 'error',
                    msg: '服务器出错'
                };
                break;
            default:
                ctx.type = 'text';
                ctx.body = '服务器出错';
        }
    }
    next && await next();
}

export default {
    tryCatchMiddleware, errorHandleMiddleware
};