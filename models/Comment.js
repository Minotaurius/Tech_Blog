const { Sequelize, Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { };

Comment.init({
    body: Datatypes.STRING,
    allowNull: false
}, {
    sequelize
});

module.exports = Comment