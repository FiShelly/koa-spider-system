import koaRouter from 'koa-router';
import oauth from './oauth';
import work from './work';
import schedule from './schedule';
import proxyIp from './proxyIp';

const router = koaRouter();

router.use('/web/oauth', oauth.routes(), oauth.allowedMethods());
router.use('/web/work', work.routes(), work.allowedMethods());
router.use('/web/schedule', schedule.routes(), schedule.allowedMethods());
router.use('/web/proxyip', proxyIp.routes(), proxyIp.allowedMethods());

export default router;