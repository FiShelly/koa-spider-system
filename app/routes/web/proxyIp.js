import koaRouter from 'koa-router';
import { proxyIpController } from '../../controllers';

const router = koaRouter();

router.get('/', async function (ctx, next) {
    ctx.body = await proxyIpController.getList(ctx);
});

export default router;
