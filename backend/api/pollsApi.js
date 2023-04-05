const Polls = require("../models/Polls");
const User = require("../models/Users");

const voteCount = async (pollId, optionId, userId) => {
  try {
    const poll = await Polls.findById(pollId);
    let option = poll.options.find((option) => option._id == optionId);
    for (optionCheck of poll.options) {
      if (optionCheck.voted_by.includes(userId)) {
        return;
      }
    }
    const pollCreator = await User.findById(poll.creatorId);
    pollCreator.points += 1;
    option.voted_by.push(userId);
    Promise.all([pollCreator.save(), poll.save()]);
  } catch (err) {
    console.log(err);
  }
};

const deletePoll = async (pollId, user) => {
  try {
    await Polls.findByIdAndDelete(pollId);
    user.polls.pull(pollId);
    user.points -= 5;
    await user.save();
  } catch {
    console.log(err);
  }
};

module.exports = { voteCount, deletePoll };
