const Router = require('koa-router');
const router = new Router({ prefix: '/v1/user' });
const { RegisterValidator } = require('../../validators/validator');
const { User } = require('../../models/user');
const { success } = require('../../lib/helper');

router.post('/register', async ctx => {
  const v = await new RegisterValidator().validate(ctx);
  //token 无意义的随机字符串
  // jwt携带数据
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  };

  await User.create(user);
  // 或者抛出一个成功的'异常'
  success();
});

module.exports = router;
