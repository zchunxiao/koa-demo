import Koa from "koa"
import axios from "axios"
import Router from './router.js'; // 导入路由
// const bodyParser = require('koa-bodyparser');
const app = new Koa();

// app.use(bodyParser());

app.use(async (ctx, next) => {
  // console.log("ctx:", ctx.path, ctx.method)
  // ctx.body = "hello world!"
  // if (ctx.path === '/classic/latest' && ctx.method === 'GET') {
  //   //ctx.body = 'classic'
  //   ctx.body = {
  //     "status": 200,
  //     "data": {
  //       "content": "最新内容",
  //       "index": 1
  //     }
  //   }
  // }
  console.log("test1")
  await next()

})
/**
 * 使用router.routes()来注册路由
 * 使用router.allowedMethods()来注册路由
 * allowedMethods()的作用是当客户端发送了不存在的路由时，返回405状态码
 * 
 * 使用router.routes()和router.allowedMethods()来注册路由
 * 这样就可以在路由中使用中间件了
 * 
 * router.routes()和router.allowedMethods()是koa-router提供的两个中间件
 * router.routes()用于注册路由
 * router.allowedMethods()用于处理不存在的路由
 * 
 * 
 * 为什么使用router.routes()
 * 1.注册路由：router.routes()会返回一个中间件函数，该函数会检查传入的请求是否与定义的路由匹配。 
 * 2.处理请求: 当请求到达 Koa 应用时，Koa 会通过中间件链来处理请求。router.routes() 是这条链中的一部分，负责将请求分发到相应的路由处理器。
 * 3.多路由支持：通过使用路由器，可以集中管理应用总共的所有路由，使代码更清晰和可维护。
 * 
 * router.routes()是将您的路由集成到 Koa 应用中不可或缺的一部分。
 */
// 使用路由
// 使用路由
app.use(Router.routes());
app.use(Router.allowedMethods()); // 确保未匹配的请求返回适当的状态


// 自定义未定义路由处理
app.use(async (ctx) => {
  ctx.status = 404; // 设置状态为 404 Not Found
  ctx.body = { message: 'Not Found' }; // 返回 Not Found 消息
});


app.listen(3001, () => {
  console.log("server is running on port 3001")
})