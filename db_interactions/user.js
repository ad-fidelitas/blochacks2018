const User = require("../models/User");

function fetchUser(userId) {
    return User.findById(userId);
}


function createUser(username, email, password) {
    return User.register(new User({
        username: username,
        email: email,
        posts: []
    }),
        password);
}

module.exports = {
    createUser : createUser,
    fetchUserUser : fetchUser
}