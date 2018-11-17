// const userDb = require("../db_interactions/user");
const postDb = require("../db_interactions/post");


// Not currently functional
// function seedPostsToUser(userName, postsJsonPath) {
//     return userDb.findByName(userName)
//     .then((userDoc)=>{
//         seedPosts(userName)
//         .then((postDocs)=>{
//             postIds = postDocs.map((postDoc)=>postDoc._id);
//             userDoc.posts = postIds;
//             return userDb.updateUser(userDoc._id, userDoc);
//         })
//     })
// }


function seedPosts(postsJsonPath) {
    const posts = require(`./seeds/${postsJsonPath}`);
    let postPromises = [];
    posts.forEach((post)=>{
        postDb.createPost(post);
    })
    return Promise.all(postPromises);
}

module.exports = {
    seedPosts : seedPosts
}
