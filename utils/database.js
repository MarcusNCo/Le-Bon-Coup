const { Sequelize } = require('sequelize')

exports.sequelize = new Sequelize('leboncoup', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})
