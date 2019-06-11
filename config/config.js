module.exports = {
  env: 'dev',
  database: {
    dbName: 'island',
    host: '192.168.1.108',
    port: 3306,
    user: 'sxp',
    password: '1234'
  },
  security: {
    // jwt的key
    secretKey: 'abcd',
    // 过期时间,1小时
    expiresIn: 60 * 60
  }
};
