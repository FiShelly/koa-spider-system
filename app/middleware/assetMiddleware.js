import send from 'koa-send';

export default async function (ctx, next) {
    const url = ctx.request.url;
    if (url.includes('/public/')) {
        ctx.set('Service-Worker-Allowed', '/');
        await send(ctx, ctx.path, {
            root: `${ctx._dir_path}`,
            maxage: 365 * 24 * 60 * 60 * 1000 * 1000
        });
    } else {
        await next();
    }

}