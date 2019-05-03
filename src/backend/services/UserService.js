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

  //---------------
  // Chat API here

  function getRooms(req) {
    const user_id = req.user ? req.user.user_id : 1;
    const result = User.findByPk(user_id)
      .then(user => {
        return user.getRooms();
      })
      .then(rooms => {
        return Promise.resolve(rooms);
      })
      .catch(err => {
        return Promise.reject(err);
      });

    return result;
  }

  //---------------

  function getThreadVotes(req) {
    const user_id = req.user ? req.user.user_id : 4;
    const result = User.findByPk(user_id)
      .then(user => {
        return user.getThreadVote();
      })
      .then(votes => {
        return Promise.resolve(votes.map(vote => vote.ThreadVoteModel));
      })
      .catch(err => {
        return Promise.reject(err);
      });

    return result;
  }

  function getPostVotes(req) {
    const user_id = req.user ? req.user.user_id : 4;
    const result = User.findByPk(user_id)
      .then(user => {
        return user.getPostVote();
      })
      .then(votes => {
        return Promise.resolve(votes.map(vote => vote.PostVoteModel));
      })
      .catch(err => {
        return Promise.reject(err);
      });

    return result;
  }

  return { getSubscription, getThreadVotes, getPostVotes, getRooms };
};
