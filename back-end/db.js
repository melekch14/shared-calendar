const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('calendrier', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
