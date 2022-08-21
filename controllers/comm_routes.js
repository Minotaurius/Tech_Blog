const comm_router = require('express').Router();
const { Comment } = require('../models/');
const { isLoggedIn } = require('./helper');

comm_router.post("/", isLoggedIn, (req, res) => {
    Comment.create({ ...req.body, userId: req.session.userId})
    .then(addComment => {
        res.json(addComment);
    })
    .catch(err => {
        console.log(err)
    });
});

module.exports = comm_router