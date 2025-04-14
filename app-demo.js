// import Koa from "koa"
// import boxen from "boxen"
// const app = new Koa();

// app.listen(3000, () => {
//   console.log(boxen(`Server is running on http://localhost:3000`, { padding: 1 }))
// })
/**
 * 此时执行 node app.js，可以看到控制台输出,表示服务器已经启动
 * 运行代码 node app.js,我们可以看到命令行一直在闪烁。这说明应用程序处于阻塞状态，只有应用程序处于阻塞状态，才能监听到从前端发过来的HTTP请求。运行代码 node app.js,我们可以看到命令行一直在闪烁。这说明应用程序处于阻塞状态，只有应用程序处于阻塞状态，才能监听到从前端发过来的HTTP请求。
 *
 * 浏览器访问http://localhost:3000，可以看到页面显示"Not Found"
 * 这是正常的，因为服务器没有返回任何的信息所以显示未Not Found
 */


/**
 * 中间件
 */

// import Koa from "koa"
// import boxen from "boxen"
// const app = new Koa();

// function test() {
//   console.log("test")
// }
// app.use(test)
// // app.use(test)和app.use(()=>{})是一样的效果
// app.listen(3000, () => {
//   console.log(boxen(`Server is running on http://localhost:3000`, { padding: 1 }))
// })

/**
 * 这和上面的显示效果是一样的，但是我们可以发现控制台出现了test
 * 编译器中打印了东西，说明浏览器发送的http请求调用了服务端的test函数
 */

/**
 * 我们如何接收前端的HTTP请求，则需要中间件,中间件其实就是一个函数
 * 一般前端发送请求都是来服务端获取数据，可以理解为请求触发服务端的方法来使得服务端发送数据给前端
 * 这里的test函数就是服务端的方法，而中间件就是用来接收前端发送的请求，然后触发服务端的方法
 * 我们只是注册了一个中间件，但是中间件并没有执行，因为中间件函数并没有被触发
 * 如何使test函数成为中间件呢，这里就要使用use方法将其注册到应用程序对象中。
 * 应用程序对象提供了use方法可以接收函数，把函数注册到应用程序对象中，这样被注册的函数就可成为一个中间件。
 *
 * 
 * 如何触发这个test函数呢，需要使用http请求来触发
 * 最简单的方式就是从浏览器中发送http请求，浏览器发送http请求会触发服务端的test函数
 *
 */




/*
 * 到这里为止，中间件虽然被触发了，但是通过浏览器访问，可以看到页面显示仍旧还是"Not Found"
 *  如何显示内容呢？这里还是需要中间件函数，但是这个中间件函数需要返回一个内容
 *  我们可以修改test函数，使其返回一个内容
 *  但是我们如何把返回的内容显示到浏览器上呢？
 * 中间件函数接收两个参数，第一个参数是ctx，第二个参数是next
 * ctx是上下文，next是函数
 * 中间件函数的执行顺序是先进后出，先注册的中间件后执行
 * next函数的作用是触发下一个中间件函数
 * 
 *  这里就需要使用ctx对象，ctx对象是上下文对象，ctx对象中包含了请求和响应的信息
 *  我们可以通过ctx对象来获取请求的信息，也可以通过ctx对象来设置响应的信息
 *  ctx对象中有一个body属性，这个属性就是用来设置响应的内容的
 *  我们可以通过ctx.body来设置响应的内容
 *  ctx.body = "hello world"表示设置响应的内容为"hello world"
 * 
 */

import Koa from "koa"
import boxen from "boxen"
import dotenv from "dotenv"
import axios from "axios"

const app = new Koa();

// 加载环境变量 .env文件
dotenv.config();

// 设置端口（可以通过环境变量配置）
const PORT = process.env.NODE_PORT || 3000;

async function test1(ctx, next) {
  console.log("test1")
  ctx.body = "hello world:test1"
  await next() // 手动调用next函数来触发下一个中间件函数，可以注释这里的代码进行测试
  // next()函数是koa自动提供的，不需要开发者自己提供

  console.log("test1 end")

}


async function test2(ctx, next) {
  console.log("test2")
  ctx.body = "hello world:test2"
  await next()
  // 这里test2是最后一个中间件，所以next是无效的
  // 需要注意的是，中间件函数建议加上async，函数内部使用await来调用next函数
  // 如果不加async，那么函数内部可以不使用await来调用next函数
  // 不强制加上async await的话，我们很难保证所有的中间件都是按照洋葱模型的模式执行的。
  // 前面的代码相对很简单所以就算不加async await也可以按照洋葱模型的模式执行，如果代码的复杂了就不好说了

  console.log("test2 end")
}
/**
 * 洋葱模型
 * 打印顺序是 test1、 test2 、test2 end 、test1 end
 */



/**
 * 这里使用app.use注册了2个中间件，但是始终只有第一个中间件生效
 * 
 * 那是不是说一个应用程序只能有一个中间件呢？
 * 并不是，一个应用程序可以注册多个中间件
 * 先注册的中间件函数先执行，后注册的中间件函数后执行
 * 
 * 在koa中只能自动帮你执行第一个中间件，后面的中间件需要手动调用next函数来执行，需要开发者自己进行调用
 * 这也就是解释了为什么了只执行了第一个注册函数
 * 
 * next函数在哪里呢？
 * next函数是中间件函数的第二个参数，也就是next函数是中间件函数的参数,
 * next函数是koa自动提供的，不需要开发者自己提供
 * next函数的作用是触发下一个中间件函数
 * 最后一个中间件函数可以不调用next函数，所以最后一个中间件函数的next函数是可选的
 * 按照惯例，每一个中间件都需要传入2个参数，第一个参数是ctx，第二个参数是next
 * 这两个参数是由koa内部的机制帮我们传入的，不需要我们开发者去管理。
 * 
 * 中间件函数的第一个参数是 ctx
 * ctx是上下文对象，ctx对象中包含了请求和响应的信息
 *  ctx对象中有一个body属性，这个属性就是用来设置响应的内容的
 *  我们可以通过ctx对象来获取请求的信息，也可以通过ctx对象来设置响应的信息
 *  ctx.body = "hello world"表示设置响应的内容为"hello world"
 */
app.use(test1)
app.use(test2)
app.use(async (ctx, next) => {
  console.log("test3")
  const a = await next()
  //这里next方法的返回内容就是下一个中间件函数的返回内容
  console.log("test3 end:", a) //不加async await 的话，这里next方法的返回内容就是Promise对象，加了返回的就是具体的内容
})
app.use(async (ctx, next) => {
  console.log("test4")
  const res = axios.get('http://7yue.pro')
  await next()
  console.log("test4 end:")
  return { test4: "test4" }
})
app.listen(PORT, () => {
  console.log(boxen(`Server is running on http://localhost:${PORT}`, { padding: 1 }))
})