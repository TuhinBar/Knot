const userModel = require("../models/Users");

async function getActivities(user) {
  const userFound = await userModel.findById(user._id).populate("polls").populate("challenges").populate("participatedChallenges").exec();
  if (userFound) {
    const combined = [...userFound.polls, ...userFound.challenges, ...userFound.participatedChallenges];
    const sorted = combined.sort((a, b) => b.timestamp - a.timestamp);

    let uniqueArray = sorted
  .filter((value, index, array) => array.findIndex(obj => String(obj._id) === String(value._id)) === index);
    return uniqueArray;
  } else {
    console.log("polls not found");
  }
}

module.exports = getActivities;
