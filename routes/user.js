//import Router from 'koa-router';
const Router = require('koa-router')
const userRouter = new Router();

// 用户列表路由
userRouter.get('/', async (ctx) => {
  ctx.body = { users: ['User 1', 'User 2'] };
});

// 用户登录
userRouter.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;

  // 验证用户
  if (username) {
    ctx.session.username = { username }; // 存储用户信息
    ctx.body = { message: 'Login successful' };
  } else {
    ctx.status = 401; // 未授权
    ctx.body = { message: 'Invalid username or password' };
  }
});


// 获取用户信息
userRouter.get('/info', async (ctx) => {
  console.log("fff:", ctx)
  const username = ctx.session.username;
  if (username) {
    ctx.body = { username };
  } else {
    ctx.status = 401; // 未授权
    ctx.body = { message: 'Unauthorized' };
  }
})


// 用户详情路由
userRouter.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  ctx.body = { userId: id, name: `User ${id}` };
});

// export default userRouter;
module.exports = userRouter;