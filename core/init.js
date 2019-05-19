const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRouters();
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
