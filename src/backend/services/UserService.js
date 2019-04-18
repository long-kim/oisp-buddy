const models = require("backend/database/models");
const User = models.User;

module.exports = passport => {
  function getSubscription(req) {
    const user_id = req.user ? req.user.user_id : 4;
    const result = User.findByPk(user_id)
      .then(user => {
        return user.getSubscription();
      })
      .then(threads => {
        return Promise.resolve(threads.map(thread => thread.thread_id));
      })
      .catch(err => {
        return Promise.reject(err);
      });

    return result;
  }

  function getVotes(req, type) {
    const user_id = req.user ? req.user.user_id : 4;
    const result = User.findByPk(user_id)
      .then(user => {
        if (type === "thread") {
          return user.getThreadVote();
        } else {
          return;
        }
      })
      .then(votes => {
        return Promise.resolve(votes.map(vote => vote.ThreadVoteModel));
      })
      .catch(err => {
        return Promise.reject(err);
      });

    return result;
  }

  return { getSubscription, getVotes };
};
