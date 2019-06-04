const Router = require('koa-router');
const router = new Router();
const { HttpException, ParameterException } = require('../../../core/http-exception.js');
const { PositiveIntegerValidator } = require('../../validators/validator');

router.post('/v1/:id/classic/latest', async (ctx, next) => {
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
