
export default function () {
    const map = new Map();

    return async function (ctx, next) {
        const tempMap = ctx.scheduleMap;
        if (!tempMap) {
            ctx.scheduleMap = map;
        }
        await next();
    };
};
