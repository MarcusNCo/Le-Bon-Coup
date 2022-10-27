const {Sequelize} = require('sequelize');

exports.sequelize = new Sequelize('le_bon_coup', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});