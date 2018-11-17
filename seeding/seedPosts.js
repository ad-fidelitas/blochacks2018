// const userDb = require("../db_interactions/user");
const postDb = require("../db_interactions/post");


function seedPosts(postsJsonPath) {
    const posts = require(`./seeds/${postsJsonPath}`);
    let postPromises = [];
    posts.forEach((post)=>{
        postPromises.push(postDb.createPost(post));
    })
    
    return Promise.all(postPromises);
}

module.exports = {
    seedPosts : seedPosts
}
