const jwt = require('jsonwebtoken');

class Auth {
  constructor(level) {
    this.level = level || 1;
    Auth.USER = 8;
    Auth.ADMIN = 16;
  }

  get m() {
    return async (ctx, next) => {
      const userToken = ctx.header['jwt-token'];
      let errMsg = 'token 非法';
      let decode = '';

      if (!userToken) {
        throw new global.errs.Forbidden(errMsg);
      }

      try {
        decode = jwt.verify(userToken, global.config.security.secretKey);
      } catch (err) {
        // token 过期
        // token 非法
        if (err.name === 'TokenExpiredError') {
          throw new global.errs.Forbidden('token 已过期');
        }
        throw new global.errs.Forbidden(errMsg);
      }

      if(decode.scope < this.level) {
        throw new global.errs.Forbidden('权限不足');
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      };

      await next();
    };
  }
}

module.exports = { Auth };
