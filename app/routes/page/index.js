import koaRouter from 'koa-router';
import page from './page';

const router = koaRouter();

router.use('/', page.routes(), page.allowedMethods());

export default router;