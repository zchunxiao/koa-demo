[人生无限](https://lemonly14.github.io/passages/node-2-5/#%E5%88%A9%E7%94%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8F%91%E9%80%81http%E8%AF%B7%E6%B1%82)

# async await

## 注意

- 用法上:await 必须在 async 函数内部使用,必须搭配在一起使用，不然会报错
- 返回值上:await 后面跟的是一个 Promise 对象，如果不是，则会转成 Promise 对象，await 会暂停 async 函数的执行，等待 Promise 对象的 resolve 值，然后继续执行 async 函数，并返回 resolve 的值
- 错误处理上:如果 await 后面的 Promise 对象被 reject，那么会抛出异常，需要用 try...catch 来捕获处理

## async await 和 Promise 的区别

- async await 是基于 Promise 的，它不能脱离 Promise 单独使用
- async await 和 Promise 一样，是非阻塞的
- async await 和 Promise 一样，都可以把异步代码，用同步的写法来表示出来，避免了层层嵌套的回调函数
- async await 和 Promise 一样，都可以简化代码，但 async await 相比 Promise，语义化更强一些
- 如果一个函数前面写有 async 这个函数的任意返回值都会被包装整一个 promise 对象，如果返回的是一个 Promise 对象，那结果就是这个 Promise 对象的结果，如果返回的是一个值，那结果就是这个值，如果抛出一个异常，那结果就是一个被拒绝的 Promise 对象

```
function f1(){
  return 123
}
console.log(f1()) // 123
// 这里可以通过在function前加async来包装返回值，查看打印结果
```

# 如何保证洋葱模型的顺序呢

我们为什么一定要保证洋葱模型额顺序呢，因为我们的中间件是按照洋葱模型的顺序执行的，如果我们不保证洋葱模型的顺序，那么我们的中间件就会乱套，导致我们的代码无法正常运行

# nodemon

```
pnpm install -g nodemon
nodemon app.js
```
