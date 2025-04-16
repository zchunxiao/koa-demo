const Koa = require('koa');
const axios = require('axios')
const bodyParser = require('koa-bodyparser');
const session = require('koa-session')
const logger = require('koa-logger')
const cors = require('koa-cors');
//import Router from './router.js'; // 导入路由


const app = new Koa();
// const session = require('koa-session')
const Router = require('./router.js'); // 导入路由

app.use(cors({
  origin: '*', // 允许的源
  allowMethods: ['GET', 'POST'], // 允许的请求方法
  allowHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  exposeHeaders: ['Content-Length', 'X-Knowledge'], // 允许暴露的响应头
  maxAge: 3600, // 预检请求的最大缓存时间
  credentials: true, // 是否允许携带凭证
}));

app.use(logger());
/**
 * 建议在顶部使用use这个中间件来“包装”所有后续中间件，因为这样能保证在所有路由之前使用
 * logger 是一个 Koa 中间件，用于记录请求日志。
 * 当客户端发送一个请求时，logger 会记录请求的 URL、请求方法、响应状态码和响应时间等信息。
 * 这些日志信息可以帮助您了解应用程序的性能和用户行为，从而进行优化和调试。
 * 
 */
app.use(bodyParser());
/**
 * koa-bodyparser 是一个 Koa 中间件，用于解析请求体中的 JSON 数据。
 * 当客户端发送一个 POST 请求时，koa-bodyparser 会将请求体中的 JSON 数据解析为 JavaScript 对象，并将其存储在 ctx.request.body 中。
 * 这样，您就可以在路由处理程序中直接访问请求体中的数据了。
 * 当什么都没传的时候，ctx.request.body为空对象
 * 
 */
app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie 允许在hhtp上发送cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));
/**
 * koa-session 是一个 Koa 中间件，用于处理会话。
 * 需要放置在router之前,否则会报错,不然怎么使用ctx.session
 */
/**
 * app.use(session())执行后，ctx.session就是个对象了
 * session()函数会返回一个中间件函数，该函数会处理会话相关的逻辑，例如读取、设置和删除会话数据。
 * 当客户端发送一个请求时，koa-session 会自动读取请求中的会话 cookie，并将其解析为会话对象。
 */



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

  console.log("ctx.session:", ctx.session)
  console.log("ctx.request.body:", ctx.request.body)

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

// // 配置 session 中间件
// app.keys = ['your-session-secret']; // 必须设置一个密钥

// const sessionConfig = {
//   key: 'koa:sess', // cookie 的名称
//   maxAge: 86400000, // cookie 的过期时间
//   httpOnly: true, // 仅在 HTTP 请求中可访问
//   signed: true, // 签名 cookie
// };
// app.use(session(sessionConfig, app));
// 自定义未定义路由处理
app.use(async (ctx) => {
  ctx.status = 404; // 设置状态为 404 Not Found
  ctx.body = { message: 'Not Found' }; // 返回 Not Found 消息
});


app.listen(3001, () => {
  console.log("server is running on port 3001")
})