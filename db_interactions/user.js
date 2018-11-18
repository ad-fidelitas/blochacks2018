const User = require("../models/User");

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

module.exports = {
    createUser : createUser,
    fetchUserByUsername,fetchUserByUsername,
    fetchUser: fetchUser,
    updateUser:updateUser
}