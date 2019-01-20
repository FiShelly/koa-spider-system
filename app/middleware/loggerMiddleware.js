import config from '../../config/server.config';
import log4js from 'koa-log4';

log4js.configure(config.log);

function routeLoggerMiddleware () {
    return async function (ctx, next) {
        const start = new Date();
        ctx.logger = log4js;
        await next();
        const ms = new Date() - start;
        log4js.getLogger('app').info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    };
}

const DEFAULT_FORMAT = ':remote-addr - -' +
    ' ":method :url HTTP/:http-version"' +
    ' :status :content-length ":referrer"' +
    ' ":user-agent"' +
    ' "time： :response-time"';

function initLoggerMiddleware () {
    return log4js.koaLogger(log4js.getLogger('http'), {
        level: 'auto',
        format: DEFAULT_FORMAT
    });
}

export default {
    log4js,
    routeLoggerMiddleware,
    initLoggerMiddleware
};
