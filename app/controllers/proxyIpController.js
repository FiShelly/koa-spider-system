import { normalUtil, httpValidate } from '../utils';
import { spiderService, workConfigService, scheduleService } from '../services';

const {packData, validator, deepClone, redirectData, getUserAgent} = normalUtil;

async function getList (ctx) {
    try {
        return packData(200, 'success', await spiderService.getProxyIpList(ctx));
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
}

export default {getList};