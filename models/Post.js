var mongoose = require('mongoose');
// var multer = require('multer');
// var User = require('./user');
// var Comment = require('./comment');
// Post schema

// comments: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Comment'
// }],
// likes: {
//     total: Number,
//     liker: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }]
// },
// imgPath: String,

var postSchema = new mongoose.Schema({
    title: String,
    timeStamp: String,
    content: String,
    imgPath: String
});

module.exports = mongoose.model("Post", postSchema);