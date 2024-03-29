const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

let UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      match: [/^[a-zA-Z0-9]+$/, "not valid"],
      index: {type: "text"},
    },
    lastname: {
      type: String,
      required: true,
      match: [/^[a-zA-Z0-9]+$/, "not valid"],
      index: {type: "text"},
    },
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9]+$/, "not valid"],
      index: {type: "text"},
    },
    googleId: {
      type: String,
    },
    password: {
      type: String,
    },
    bio: {
      type: String,
    },
    date_of_birth: { type: Date },
    email: {
      type: String,
      required: true,
      index: true,
    },
    profilePic_url: {
      type: String,
    },
    profilePicId:{type:String},
    points: {
      type: Number,
      default: 0,
    },
    sharedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    participatedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenge" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenge" }],
    polls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", UserSchema);
