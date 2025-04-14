import Router from 'koa-router';

const userRouter = new Router();

// 用户列表路由
userRouter.get('/', async (ctx) => {
  ctx.body = { users: ['User 1', 'User 2'] };
});

// 用户详情路由
userRouter.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  ctx.body = { userId: id, name: `User ${id}` };
});

export default userRouter;