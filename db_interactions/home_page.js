const ReceiverQueue = require("../models/ReceiverQueue");

fetchQueues = function() {
    return ReceiverQueue.find({});
}

module.exports = {
    fetchQueues: fetchQueues
};