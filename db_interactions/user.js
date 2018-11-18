const User = require("../models/User");
const postDb = require("./post");

function fetchUser(userId) {
    return User.findById(userId);
}

function fetchUserByUsername(username) {
    return User.findOne({username: username})
    .then((res)=>{
        if(res.username) {
            return res;
        }
        else {
            throw Error("User not found")
        }
    })
}


function createUser(username, email, password) {
    return User.register(new User({
        username: username,
        email: email,
        posts: [],
        isReceiver: false,
        donors: []
    }),
        password);
}

function updateUser(userId, update) {
    return User.findByIdAndUpdate(userId, update);
}

function addPost(userId, post) {
    postDb.createPost(post)
    .then((postDoc)=>{
        fetchUser(userId)
        .then((userDoc)=>{
            let oldposts = userDoc.posts;
            let newposts = oldposts.slice();
            newposts.push(postDoc._id);
            return updateUser(userDoc._id, newPosts);
        })
        .then((userDoc)=>{
            return new Promise((fulfill, reject)=>{fulfill(postDoc)});
        });
    })
}

module.exports = {
    createUser : createUser,
    fetchUserByUsername,fetchUserByUsername,
<<<<<<< HEAD
    fetchUserUser : fetchUser,
    updateUser:updateUser,
    addPost: addPost
=======
    fetchUser: fetchUser,
    updateUser:updateUser
>>>>>>> df854e62687eade7d5469f5b70484d112d26ff14
}