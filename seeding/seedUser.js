const userDb = require("../db_interactions/user.js");
const seedPosts = require("./seedPosts");

function seedUser(userJsonPath) {
    let userData = require(`./seeds/${userJsonPath}`);
    return userDb.createUser(userData);
}

// Not currently functional
function seedPostsToUser(userName, postsJsonPath) {

    return userDb.findByName(userName)
    .then((userDoc)=>{
        seedPosts(userName)
        .then((postDocs)=>{
            postIds = postDocs.map((postDoc)=>postDoc._id);
            userDoc.posts = postIds;
            return userDb.updateUser(userDoc._id, userDoc);
        })
    })
}

function seedUserAndPosts(userJson, postsJsonPath){
    seedUser(userJson)
    .then((userDoc)=>seedPostsToUser(userDoc.username, postsJsonPath))
}

module.exports = {
    seedUser : seedUser,
    seedPostsToUser : seedPostsToUser,
    seedUserAndPosts: seedUserAndPosts
}