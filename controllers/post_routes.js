// const post_router = require("express").Router();
// const { Comment, Post, User } = require('../models');
// const { isLoggedIn } = require('./helper');

// post_router.post('/', isLoggedIn, (req, res) => {
//     const post = req.body;

//     Post.create({ ...post, userId: req.session.userId })
//     .then(addPost => {
//         res.json(addPost);
//     })
//     .catch(err => {
//         console.log(err)
//     })
// });

// module.exports = post_router