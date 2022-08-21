const dash_router = require("express").Router();
const Post = require('../models/Post');
const { isLoggedIn } = require('./helper');

dash_router.get('/', isLoggedIn, (req, res) => {
    Post.findAll({
        where: {
            id: user_id
        }
    })
    .then(post => {
        post = {
            title: post.title,
            body: post.body
        };

        res.render("dashboard", { post });
    });
});

// dash_router.get("")

module.exports = dash_router