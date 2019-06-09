class HttpException extends Error {
  constructor(msg = 'net error', errorCode = 10000, code = 400) {
    super();
    this.code = code;
    this.errorCode = errorCode;
    this.msg = msg;
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.errorCode = errorCode || 10000;
    this.msg = msg || '参数错误';
  }
}

class Success extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 201;
    this.msg = msg || 'ok';
    this.errorCode = errorCode || 0;
  }
}

class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 404;
    this.errorCode = errorCode || 10000;
    this.msg = msg || '未找到';
  }
}

class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 401;
    this.errorCode = errorCode || 10000;
    this.msg = msg || '授权失败';
  }
}

module.exports = { HttpException, ParameterException, Success, NotFound, AuthFailed };
