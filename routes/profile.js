const postDb = require("../db_interactions/post");
const userDb = require("../db_interactions/user");
const app = require("express");
const router = app.Router();

router.get("/:user_id", function(res,req) {
    let viewerId = req.user._id;
    let receiverId = req.params.user_id;

    // Find out if you need to fetch the user from db (or if content )
    // maintained online

    // Im here assuming that I'm getting the information straight from the url, so
    // There will be a type problem here between the two type of ids
    userDb.fetchUser(receiver)
    .then

    if (!(receiverUserId in viewerId.receivers)) {
        // render page one way
    } else {

    }


})
