const { HttpException } = require('../core/http-exception');

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (global.config.env === 'dev') {
      throw err;
    }

    if (err instanceof HttpException) {
      ctx.body = {
        msg: err.msg,
        error_code: err.errorCode,
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = err.code;
    } else {
      ctx.body = {
        msg: 'network error',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = 500;
    }
  }
};

module.exports = catchError;
