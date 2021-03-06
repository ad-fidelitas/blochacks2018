const   mongoose = require("mongoose"),
        User = require("./Post");

const ReceiverQueueSchema = new mongoose.Schema({
    users : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    sizeLimit: Number,
    type: String
})
// type will either be recent or supported
module.exports = mongoose.model("ReceiverQueue", ReceiverQueueSchema);