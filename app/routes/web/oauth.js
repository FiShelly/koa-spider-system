import koaRouter from 'koa-router';
import { userController } from '../../controllers';

const router = koaRouter();

router.get('/info', async function (ctx, next) {
    ctx.body = await userController.userInfo(ctx);
});

router.get('/login', async function (ctx, next) {
    const data = await userController.oauthLogin(ctx);
    ctx.status = data.status;
    if (ctx.status > 400) {

    } else {
        ctx.redirect(data.url);
    }
});


router.get('/logout', async function (ctx, next) {
    ctx.body = await userController.logout(ctx);
});

export default router;
