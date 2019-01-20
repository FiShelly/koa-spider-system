import { Cache } from '../utils';

export default function () {
    const cache = new Cache();
    return async function (ctx, next) {
        const tempCache = ctx.cache;
        if (!tempCache) {
            ctx.cache = cache;
        }
        await next();
    };
};
