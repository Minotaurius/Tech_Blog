const { Sequelize, Model, Datatypes, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { };

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING,
    body: DataTypes.STRING
},
{
    sequelize
});

module.exports = Post;