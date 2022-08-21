const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize (
    'blog_db', // db name
    'root', // username
    'Superfoxgarfmode22!', //password 
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

module.exports = sequelize;