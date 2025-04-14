import Router from 'koa-router';
import { productRoutes, userRoutes, cookiesRoutes } from './routes/index.js'; // 从 index.js 导入路由

const router = new Router();

// 根目录路由，重定向到新首页
router.get('/', async (ctx) => {
  ctx.redirect('/new-home'); // 重定向到 /new-home
});

// 新首页路由
router.get('/new-home', async (ctx) => {
  ctx.body = '新首页';
});

router.get('/classic/latest', async (ctx) => {
  ctx.body = {
    key: "classic"
  }
});

// 注册其他路由
router.use('/products', productRoutes.routes(), productRoutes.allowedMethods());
router.use('/users', userRoutes.routes(), userRoutes.allowedMethods());
router.use('/cookies', cookiesRoutes.routes(), cookiesRoutes.allowedMethods());
export default router;