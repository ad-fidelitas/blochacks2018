const app = require("express");
const router = app.Router();
const postDb = require("../db_interactions/post");
const userDb = require("../db_interactions/user");
const User = require('../models/User');

router.get('/', (req, res) => {
    if(!req.user) {
        userDb.fetchUser(req.user._id)
        .then((currUser) => {
            res.render('profile', {user : currUser})
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/login');
        });
    } else {
        res.redirect('/login');
    }
});

router.get("/:user_id", function(res,req) {
    let viewerId = undefined;
    if (req.user != undefined) {
        viewerId = req.user._id;
    }
    let receiverId = req.params.user_id;
    // Find out if you need to fetch the user from db (or if content )
    // maintained online
    
    // Im here assuming that I'm getting the information straight from the url, so
    // There will be a type problem here between the two type of ids
    userDb.fetchUser(receiverId)
    .then((receiverDoc)=>{
        let outBoundObject = {
            isReceiver : false,
            posts: [],
            username: receiverDoc.username,
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