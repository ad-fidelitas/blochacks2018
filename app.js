const config = {
    seed:true,
    init: true
}

const express               = require('express')

      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      // Models:
      Post                  = require('./models/Post'),
      User                  = require('./models/User'),
      ReceiverQueue         = require("./models/ReceiverQueue");
      // Other stuff:
      multer                = require('multer'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      methodOverride        = require('method-override');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));
      // Routes:
const postRoutes = require('./routes/posts'),
      profileRoutes = require('./routes/profile'),
      indexRoutes = require('./routes/index');


// Config:
app.set('view engine', 'ejs');
app.use(require('express-session')({
    secret: 'Helping people is fun',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.bodyParser());
app.use(methodOverride('_method'));

// passport auth:
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to pass user into each route
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// requiring routes
app.use(indexRoutes);
app.use("/post", postRoutes);
app.use("/profile", profileRoutes);

// MongoDB set-up
mongoose.connect('mongodb://localhost:27017/blochacks', {useNewUrlParser:true});

app.get('/', (req, res) => {
    res.render('index');
})

ReceiverQueue.create({
    type: "recent",
    users: [],
    sizeLimit: 10
})
.then((queueDoc)=>{
    if(config.seed) {
        const seed = require("./seeding/seed");
        seed.exec()
        .then((res)=>{
            return User.find({})
        })
        .then((userDocs)=>{
            let userIds = userDocs.map((userDoc)=>userDoc._id);
            return ReceiverQueue.findByIdAndUpdate(queueDoc._id, {users: userIds} );
        })
        .then((queueDoc)=>{
            console.log("queueDocIsinitialized with seeded data");
        })
        .catch((err)=>{
            console.log("seeding has failed");
            console.log(err);
        })
    }
})
.catch((err)=>{
    console.log(err);
})









// 404 error
app.use(function (req, res, next) {
    res.status(404).render('error');
});

// 500 error
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!');
});

app.listen(3000, function (){
    console.log('Server started on port 3000');
});


