const auth_router = require('express').Router();
const User = require('../models/User');
const { isLoggedIn } = require('./helper');

auth_router.post('/register', isLoggedIn, (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        req.session.errors = ['Please check your login credentials and try again'];
        return res.redirect('/register')
    }

    User.findOne({
        where: {
            email
        }
    }).then(user => {
        if (user) {
            req.session.errors = ['A user already exists with that email address'];
            return res.redirect('/register')
        }

        User.create(req.body)
            .then(new_user => {
                req.session.save(() => {
                    req.session.user_id = new_user.id;
                    res.redirect('/')
                });
            }).catch(err => {
                req.session.errors = err.errors.map(e => e.message);
                res.redirect('/register')
            });
    });
});

auth_router.post('/login', isLoggedIn, (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.session.errors = ['Please check your login credentials and try again.'];
        return res.redirect('/login');
    }

    User.findOne({
        where: {
            email
        }
    }).then(async user => {
        if(!user) {
            req.session.errors = ['No user account found using that email address.']
            return res.redirect('/login');
        }
        const valid_pass = await user.validatePassword(password, user.password);
        if(!valid_pass) {
            req.session.errors = ['Your password is incorrect'];
            res.redirect('/login');
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            res.redirect('/')
        });
    });
});

auth_router.get('/logout', (req, res) => {
    if(!req.session.user_id) return res.redirect('/');

    req.session.destroy(() => {
        res.redirect('/');
    });
})

module.exports = auth_router;