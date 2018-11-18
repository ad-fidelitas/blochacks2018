const app = require("express");
const router = app.Router();
const userDb = require("../db_interactions/user");
const postDb = require("../db_interactions/post");
const path = require('path');

//Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// img upload storage engine
var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// img init upload
var upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('newPost');

function checkFileType (file, cb) {
    // Allowed extensions
    var filetypes = /jpeg|jpg|png|gif/;
    // check extensions
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check mime type
    var mimetype = filetypes.test(file.mimetype);
    if (extname && extname) {
        return cb(null, true);
    }
    cb('Error: Images only');
}


//Routes
router.get("/new", (req, res) => {
    res.render('newPost');
});

router.post("/", function(req,res){
    upload(req, res, (err) => {
        if (err) {
            res.render('newPost', {msg : err});
        } else {
            if(req.file == undefined) {
                return res.render('newPost', {msg: 'Error: No file selected'});
            }
            console.log(req.file.filename);
            Post.create({
                title: req.body.title,
                timeStamp: new Date().toISOString(),
                author: {
                    id: req.user._id,
                    username: req.user.username
                },
                imgPath: '/uploads' + '/' + req.file.filename,
                content: req.body.content
            }, function (err, post) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(post);
                    User.findOne({username : req.user.username}, function (err, foundUser) {
                        if (err) {
                            console.log(err);
                        } else {
                            foundUser.posts.push(post._id);
                            foundUser.save();
                            console.log(foundUser.posts);
                            res.redirect('/profile/' + req.user.username);
                        }
                    });
                }
            });
        }
});
})


router.post("/edit", function(req,res){
    upload(req, res, (err) => {
        if (err) {
            res.render('editPage', {msg : err});
        } else {
            if(req.file == undefined) {
                return res.render('editPage', {msg: 'Error: No file selected'});
            }
            console.log(req.file.filename);
            User.findOne({username : req.user.username}, function (err, foundUser) {
                if (err) {
                    console.log(err);
                } else {
                    foundUser.description = req.body.description;
                    foundUser.proImgPath = '/uploads/' + req.file.filename;
                    foundUser.save();
                    console.log(foundUser.proImgPath);
                    res.redirect('/profile/' + req.user.username);
                }
            });
        }
});

    // console.log("posted");
    // let newPost = {
    //     title: req.body.title,
    //     timeStamp : new Date(new Date()),
    //     content: req.body.content
    // };
    // let userId = req.user._id;

    // postDb.createPost(newPost)
    // .then((postDoc)=>{
    //     console.log(postDoc);
    //     let oldposts = req.user.posts;
    //     let newposts = oldposts.slice();
    //     newposts.push(postDoc._id);
    //     return userDb.updateUser(userId, {posts:newposts});



    // })
    // .then((aok)=>{
    //     res.redirect("/profile")
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })

    // console.log(req.user.posts);
    // userDb.addPost(userId, newPost)
    // .then((postDoc)=>{
    //     console.log("here");
    //     console.log(postDoc);
    //     res.json(postDoc);
    // })
    // .catch((err)=>{
    //     console.log(err)
    //     res.json(err);
    // })
    // res.redirect("mainProfile");




})



module.exports = router;