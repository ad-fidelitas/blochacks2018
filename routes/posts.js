const app = require("express");
const router = app.Router();
const userDb = require("../db_interactions/user");
const postDb = require("../db_interactions/post");


router.post("/", function(req,res){
    // console.log("posted");

    let newPost = {
        title: req.body.title,
        timeStamp : new Date(new Date()),
        content: req.body.content
    };

    let userId = req.user._id;
    console.log(req.user.posts);
    // postDb.createPost(newPost)
    // .then((postDoc)=>
    userDb.addPost(userId, newPost)
    .then((postDoc)=>{
        res.json(postDoc);
    })
    .catch((err)=>{
        console.log(err)
        res.json(err);
    })
    res.redirect("mainProfile")
})


module.exports = router;