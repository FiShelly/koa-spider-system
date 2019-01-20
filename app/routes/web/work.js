import koaRouter from 'koa-router';
import { spiderController } from '../../controllers';

const router = koaRouter();

router.get('/', async function (ctx, next) {
    ctx.body = await spiderController.getList(ctx);
});

router.delete('/:id', async function (ctx, next) {
    ctx.body = await spiderController.remove(ctx);
});

router.post('/all', async function (ctx, next) {
    ctx.body = await spiderController.saveAll(ctx);
});

router.post('/', async function (ctx, next) {
    ctx.body = await spiderController.startSpider(ctx);
});

router.put('/:id', async function (ctx, next) {
    ctx.body = await spiderController.startSpider(ctx);
});

export default router;
