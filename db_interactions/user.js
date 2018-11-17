const User = require("../models/User");

function fetchUser(userId) {
    return User.findById(userId);
}

module.exports = {
    fetchUserUser : fetchUser
}