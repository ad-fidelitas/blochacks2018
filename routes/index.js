const express = require('express');
const router = express.Router();
const User = require('../models/User'),
      passport = require('passport');


//MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Login routes
router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), function (req, res) {
});

// Sign-up routes
router.get('/signup', function (req, res) {
    res.render('signup');
});

router.post('/signup', function (req, res) {
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        posts: []
    }),
        req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('signup', {err : err});
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

// Logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;