//import Router from 'koa-router';
const Router = require('koa-router')
const productRouter = new Router();

// 产品列表路由
productRouter.get('/', async (ctx) => {

  ctx.body = { products: ['Product 1', 'Product 2'] };
});

// 产品详情路由
productRouter.get('/:id', async (ctx) => {
  const { id } = ctx.params;

  ctx.body = { productId: id, name: `Product ${id}` };
});


productRouter.post('/api/data', async (ctx) => {
  const { name, age } = ctx.request.body;


  ctx.body = { message: `Received name: ${name}, age: ${age}` };
})
//export default productRouter;
module.exports = productRouter;