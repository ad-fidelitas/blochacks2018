const app = require("express");
const router = app.Router();
const postDb = require("../db_interactions/post");
const userDb = require("../db_interactions/user");
const User = require('../models/User');

router.get('/', (req, res) => {
<<<<<<< HEAD
    if(!req.user) {
=======
    if(req.user != undefined) {
>>>>>>> df854e62687eade7d5469f5b70484d112d26ff14
        userDb.fetchUser(req.user._id)
        .then((currUser) => {
            let outBoundObject = {
                profileData: currUser,
                isReceiver : false,
                posts: []
            }
            res.render('profile', {data : outBoundObject})
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/login');
        });
    } else {
        res.redirect('/login');
    }
});

router.get("/:user_id", function(req,res) {
    let viewerId = undefined;
    if (req.user != undefined) {
        viewerId = req.user._id;
    }
    let receiver = req.params.user_id;
    // Find out if you need to fetch the user from db (or if content )
    // maintained online
    
    // Im here assuming that I'm getting the information straight from the url, so
    // There will be a type problem here between the two type of ids
    userDb.fetchUserByUsername(receiver)
    .then((receiverDoc)=>{
        let outBoundObject = {
            profileData: receiverDoc,
            isReceiver : false,
            posts: []
        }
        // moneyRaised : receiverDoc.name
        if (viewerId != undefined && (viewerId in receiverDoc.donors)) {
            outBoundObject.posts = receiverDoc.posts;
            outBoundObject.isReceiver = true;
        } 
        res.render('profile', {data: outBoundObject})
        // res.render("feed", outBoundObject);
    })
    .catch((err)=>{
        // Error handling will need to be implemented
        console.log(err);
        res.render('error');
    })
});


router.post("/", function(req,res){
    let update = req.body;
    // req.user shoul always be active, but just in case
    if(req.user) {
        let userId = req.user.id;

        let updateUserObject = {
            moneyGoal: update.moneyGoal,
            country : update.country
        }

        // pushpop this user on the stack

        userDb.updateUser(userId, updateUserObject);

    } else {
        res.redirect("/");
    }
});

module.exports = router;