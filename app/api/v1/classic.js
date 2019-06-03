const Router = require('koa-router');
const router = new Router();
const { HttpException, ParameterException } = require('../../../core/http-exception.js');

router.get('/v1/classic/latest', (ctx, next) => {
  if(1) {
    const error = new ParameterException();

    throw error
  }

  ctx.body = {
    key: 'cal'
  };
});

module.exports = router;
