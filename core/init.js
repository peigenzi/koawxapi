const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.loadConfig();
    InitManager.loadHttpException();
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js';
    const config = require(configPath);
    global.config = config;
  }

  static loadHttpException() {
    const errors = require('./http-exception');
    global.errs = errors;
  }

  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api`;

    requireDirectory(module, apiDirectory, { visit: autoUseRouter });

    function autoUseRouter(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }
}

module.exports = InitManager;
