const express = require('express');
const router = express.Router();
const User = require('../models/User'),
      passport = require('passport');

const homePageDbs = require("../db_interactions/home_page");


//MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Make a priorityAccounts object
// Make a more recent Model
router.get("/", function(req,res){
    // This functionality is based on the fact that Users and Receiver pages are created differently
    homePageDbs.getQueues()
    .then((queues)=>{
        res.json(
            {
                recent: queues.filter((queue)=>(queue.type == "recent"))[0],
                support: queues.filter((queue)=>(queue.type == "support"))[0]
            }
        )
    });
})

// how do I test this after the fact
// Seed with receiver pages (receiverPage has a date)


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
    console.log('/signup');
    console.log(req);
    console.log(req.body)
    console.log(req.body.username);
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
        console.log('Here');
        passport.authenticate('local')(req, res, function () {
            console.log('HEREE');
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