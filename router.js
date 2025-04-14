import Router from "koa-router"

const router = new Router()
// 首页路由
router.get('/', async (ctx, next) => {
  // 可以选择在这里进行重定向
  ctx.redirect('/new-home'); // 重定向到 /new-home
  await next(); // 由于重定向，通常不需要调用 next()
});

// 新首页路由
router.get('/new-home', async (ctx) => {
  ctx.body = '新首页';
});

router.get('/classic/latest', async (ctx, next) => {
  console.log("ctx:", ctx)
  ctx.body = { key: 'classic' }
  //await next();
})

router.post('/classic/latest', async (ctx, next) => {
  ctx.body = { key: 'classic', name: "zhangsan" }
})
// 使用 router.allowedMethods() 确保未匹配的请求返回适当的状态
// 在所有路由定义之后调用 allowedMethods
router.allowedMethods(); // 确保未匹配的请求返回适当的状态
// 导出 router 实例
export default router