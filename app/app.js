import Koa from 'koa';
import * as koaBody from 'koa-body';
import session from 'koa-session';
import {
    loggerMiddleware,
    configMiddleware,
    cacheInitMiddleware,
    loginMiddleware,
    errorMiddleware,
    assetMiddleware,
    scheduleTaskMiddleware
} from './middleware';
import webRoute from './routes/web';
import pageRoute from './routes/page';
import KoaCsrf from 'koa-csrf';

const {log4js, routeLoggerMiddleware, initLoggerMiddleware} = loggerMiddleware;
const {errorHandleMiddleware, tryCatchMiddleware} = errorMiddleware;
const app = new Koa();
const appLogger = log4js.getLogger('app');
const errorLogger = log4js.getLogger('error');

app.use(tryCatchMiddleware);

app.use(initLoggerMiddleware());

app.use(cacheInitMiddleware());
app.use(scheduleTaskMiddleware());
app.use(configMiddleware(process.cwd()));
app.use(loginMiddleware());

app.use(assetMiddleware);

// session middleware
app.keys = ['user logined secret'];
app.use(session({
    key: 'koa:sess',
    maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
}, app));

app.use(koaBody({
    multipart: true,
    'formLimit': '5mb',
    'jsonLimit': '5mb',
    'textLimit': '5mb'
}));

app.use(errorHandleMiddleware);
app.use(routeLoggerMiddleware());

app.use(new KoaCsrf());
app.use(webRoute.routes(), webRoute.allowedMethods());
app.use(pageRoute.routes(), pageRoute.allowedMethods());


app.on('error', (err) => {
    errorLogger.error('server error', err);
});

export default app;
