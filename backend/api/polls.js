const userModel = require("../models/Users");

async function findPolls(user) {
  const userFound = await userModel.findById(user._id).populate("polls").exec();
  if (userFound) {
    return userFound.polls;
  } else {
    console.log("poll not found");
  }
}

module.exports = findPolls;

