import { normalUtil, httpValidate } from '../utils';
import { spiderService, workConfigService, scheduleService } from '../services';

const {packData, validator, deepClone, redirectData, getUserAgent} = normalUtil;

async function getList (ctx) {
    try {
        return packData(200, 'success', scheduleService.taskList(ctx));
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
}

async function cancel (ctx) {
    try {
        scheduleService.cancel(ctx, ctx.params.id);
        return packData(200, 'success', {});
    } catch (e) {
        console.log(e);
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
}

async function download (ctx) {
    try {
        const params = ctx.params;
        httpValidate(params, {
            id: 'numeric'
        });

        const config = await scheduleService.getData(ctx, params.id);
        const fileName = `download_${config.id}_${config.cnt}.zip`;
        return {
            stream: await scheduleService.zipFiles(ctx, config),
            fileName
        };
    } catch (e) {
        console.log(e);
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
}

export default {getList, cancel, download};