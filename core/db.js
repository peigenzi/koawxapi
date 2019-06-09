const Sequelize = require('sequelize');
const { user, password, dbName, host, port } = require('../config/config').database;

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  timezone: '+08:00',
  define: {
    //不自动生成时间
    // timestamps: false
    //生成deletetime
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true
  }
});

sequelize.sync();

module.exports = { sequelize };
