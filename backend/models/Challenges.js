const mongoose = require("mongoose")

const challengesSchema = mongoose.Schema({
    creatorId: { type: mongoose.Schema.Types.ObjectId,ref: "User", required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    participators:[{type:mongoose.Schema.Types.ObjectId,ref: "User"}],
    duration:{type:String}
});

module.exports = mongoose.model("Challenge", challengesSchema);