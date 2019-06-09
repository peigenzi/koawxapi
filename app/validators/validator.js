const { LinValidator, Rule } = require('../../core/lin-validator');
const { User } = require('../models/user');
const { LoginType } = require('../lib/enum');

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule('isInt', '需要正整数', { min: 1 })];
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [new Rule('isEmail', '不符合email规范')];
    this.password1 = [new Rule('isLength', '需要6-32个字符', { min: 6, max: 32 }), new Rule('matches', '密码不合法', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')];
    this.password2 = this.password1;
    this.nickname = [
      new Rule('isLength', '昵称4-32位', {
        min: 4,
        max: 32
      })
    ];
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;

    if (psw1 !== psw2) {
      // 直接抛异常，验证器会收集到
      throw new Error('两个密码必须相同');
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (user) {
      throw new Error('email 已存在');
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super();
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ];
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {
        min: 6,
        max: 128
      })
    ];
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type必须是参数');
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法');
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator
};
