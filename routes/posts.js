const app = require("express");
const router = app.Router();
const userDb = require("../db_interactions/user");
const postDb = require("../db_interactions/post");


router.post("/", function(req,res){
    let newPost = {
        title: req.body.title,
        timeStamp : new Date(new Date()),
        content: req.body.content
    };

    postDb.createPost(newPost)
    // .then((postDoc)=>userDb.addPost(userId, postDoc._id))
    .then((postDoc)=>{
        res.json(postDoc);
    })
    .catch((err)=>{
        // There needs to be response either way
        console.log(err)
        res.json(err);
    })

    // res.redirect("mainProfile")
})


module.exports = router;