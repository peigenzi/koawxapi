const Router = require('koa-router');
const router = new Router();

router.get('/v1/book/latest', (ctx, next) => {
  const {params, query, headers, body} = ctx
  ctx.body = 1;
});

module.exports = router;