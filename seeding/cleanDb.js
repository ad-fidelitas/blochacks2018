const User = require("../models/User");
const Post = require("../models/Post");

function cleanDb() {
    return User.deleteMany({})
    .then((res)=>Post.deleteMany({}));
}

module.exports = cleanDb;