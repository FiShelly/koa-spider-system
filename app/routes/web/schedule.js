import koaRouter from 'koa-router';
import { scheduleController } from '../../controllers';

const router = koaRouter();

router.delete('/:id', async function (ctx, next) {
    ctx.body = await scheduleController.cancel(ctx);
});

router.get('/', async function (ctx, next) {
    ctx.body = await scheduleController.getList(ctx);
});

router.get('/download/:id', async function (ctx, next) {
    const downloadObj = await scheduleController.download(ctx);
    ctx.status = 200;
    ctx.set('Content-disposition', `attachment;filename=${downloadObj.fileName}`);
    ctx.body = downloadObj.stream;
});
//
// const send = require('koa-send');
// router.post('/download/:name', async (ctx) => {
//         const name = ctx.params.name;
//         const path = `upload/${name}`;
//         ctx.attachment(path);
//         await send(ctx, path);
//     }
// );

export default router;
