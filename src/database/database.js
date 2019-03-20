const Sequelize = require('sequelize');

const enviropment = process.env.NODE_ENV || 'development';

const config = require('../config/config.js')[enviropment]


const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect
    }
)

//console.log(sequelize)
module.exports = sequelize;