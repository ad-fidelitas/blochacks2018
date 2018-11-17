const Post = require("../models/Post");

function createPost(post) {
    return Post.create(post);
}

module.exports = {
    createPost : createPost
}