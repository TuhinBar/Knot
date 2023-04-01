const Poll = require("../models/Polls");



const fetchPolls = async () => {
    const polls = await Poll.find({}).sort({timestamp: -1}).populate("creatorId").exec();
    return polls;
    }

module.exports = fetchPolls;
