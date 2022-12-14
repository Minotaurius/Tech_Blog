const view_router = require('express').Router();
const { User } = require('../models/');
const { isLoggedIn } = require('./helper');

view_router.get('/', isLoggedIn, (req, res) => {
    const user_id = req.session.user_id

    if(user_id) {
        return User.findOne({
            where: {
                id: user_id
            },
            attributes: ['id', 'email', 'username']
        })
        .then(user => {
            user = {
                username: user.username,
                email: user.email
            };
            res.render('index', { user });
        });
    }

    res.render('index')
});

view_router.get('/login', isLoggedIn, (req, res) => {
    res.render('login', { errors: req.session.errors });
});

view_router.get('/register', isLoggedIn, (req, res) => {
    res.render('register', { errors: req.session.errors })
});

view_router.get('/dashboard', isLoggedIn, (req, res) => {
    const user_id = req.session.userId
    if(user_id) {
        // console.log('This is working')
        return User.findOne({
            where: {
                id: user_id
            },
            attributes: 
            ["id","email","username"],
        })
        .then(user => {
            user = {
                username: user.username,
                email: user.email
            }
            res.render('dashboard', { user })
        });
    }
    res.render('dashboard')
});

module.exports = view_router