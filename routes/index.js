const express = require('express');
const router = express.Router();
const User = require('../models/User'),
      passport = require('passport'),
      userDb = require('../db_interactions/user');


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
   userDb.createUser(req.body.username, req.body.email, req.body.password) 
    .then((userDoc)=> {
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    })
    .catch((err)=>{
        console.log(err);
        res.redirect('/signup');
    });
});

// function (err, user) {
//         if (err) {
//             console.log(err);
//             return res.render('signup', {err : err});
//         }
//         
// Logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;