const { HttpException } = require('../core/http-exception');

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const isHttpException = err instanceof HttpException;
    const isDev = global.config.env === 'dev';

    if (isDev && !isHttpException) {
      throw err;
    }

    if (isHttpException) {
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
