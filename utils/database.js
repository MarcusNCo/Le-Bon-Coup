const {Sequelize} = require('sequelize');

exports.sequelize = new Sequelize('le-bon-coup', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});