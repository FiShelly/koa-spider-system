import { normalUtil } from '../utils';

const packData = normalUtil.packData;
const notAllowed = ['/web/'];
const ignoreArray = ['/ignore', '/login'];

function isNotIgnore (url) {
    return !ignoreArray.filter(val => !url.includes(val)).length &&
        notAllowed.filter(val => url.includes(val)).length > 0;
}

export default function () {
    return async function (ctx, next) {
        let url = ctx.url;
        if (isNotIgnore(url) && !ctx.session.user) {
            ctx.body = packData(401, 'error', 'no-logined');
            return false;
        }
        await next();
    };
};
