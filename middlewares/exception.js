const { HttpException } = require('../core/http-exception');
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof HttpException) {
      ctx.body = {
        msg: err.msg,
        error_code: err.errorCode,
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = err.code;
    }
  }
};

module.exports = catchError;
