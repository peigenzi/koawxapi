const Router = require('koa-router');
const router = new Router({
  prefix: 'v1/classic'
});
const { HttpException, ParameterException } = require('../../../core/http-exception.js');
const { PositiveIntegerValidator } = require('../../validators/validator');
const { Auth } = require('../../../middlewares/auth');

// auth里传api的权限级别
router.get('/latest', new Auth(9).m, async (ctx, next) => {
  const path = ctx.params;
  const { query, headers, body } = ctx.request;
  const v = await new PositiveIntegerValidator().validate(ctx);

  // if (1) {
  //   const error = new ParameterException();

  //   throw error;
  // }

  ctx.body = {
    key: 'classic'
  };
});

module.exports = router;
