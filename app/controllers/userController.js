import { normalUtil } from '../utils';
import rq from 'request-promise';
const packData = normalUtil.packData;
const validator = normalUtil.validator;
const deepClone = normalUtil.deepClone;
const redirectData = normalUtil.redirectData;

const userInfo = async function (ctx) {
    return packData(200, 'success', ctx.session.user);
};

const oauthLogin = async function (ctx) {
    const request = ctx.request.query;
    const token = request.access_token;
    const api = `${ctx._server_config.oauthAPI}?access_token=${token}`;
    if (!token) {
        return redirectData(412, '/error', 'input-invalidate-empty');
    }
    try {
        const opt = {
            uri: api,
            method: 'GET',
            json: true
        };
        const data = await rq(opt);
        ctx.logger.getLogger('default').info(data);
        if (data.code === 200) {
            ctx.session.user = data.data;
            return redirectData(302, '/logined');
        }
        return redirectData(data.code, '/error', 'server-error');
    } catch (e) {
        console.log(e);
        ctx.logger.getLogger('error').error(e);
        return redirectData(500, '/error', 'mysql-error');
    }
};

export default {
    oauthLogin, userInfo
};
