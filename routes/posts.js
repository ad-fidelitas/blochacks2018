const app = require("express");
const router = app.Router();
const userDb = require("../db_interactions/user");
const postDb = require("../db_interactions/post");

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
    // console.log("posted");
    let newPost = {
        title: req.body.title,
        timeStamp : new Date(new Date()),
        content: req.body.content
    };
    let userId = req.user._id;
    console.log(req.user.posts);
    userDb.addPost(userId, newPost)
    .then((postDoc)=>{
        console.log("here");
        res.json(postDoc);
    })
    .catch((err)=>{
        console.log(err)
        res.json(err);
    })
    // res.redirect("mainProfile");

})

module.exports = router;