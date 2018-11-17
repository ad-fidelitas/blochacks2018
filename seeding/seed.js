const cleanDb = require("./cleanDb");
const seedUser = require("./seedUser");



function exec(){
    return cleanDb()
    .then((res)=>seedUser.seedUserAndPosts("User1.json", "postList1.json"));
}

module.exports = {
    exec:exec
};