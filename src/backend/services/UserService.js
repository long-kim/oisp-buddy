const models = require("backend/database/models");
const User = models.User;
const Room = models.Room;
const Op = require("sequelize").Op;

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

  function getActiveUser(req) {
    const user_id = req.user ? req.user.user_id : 1;
    return user_id;
  }

  function getRoomList(req) {
    // Get all chat room from user
    const user_id = req.user ? req.user.user_id : 1;
    const result = Room.findAll({
      where: {
        [Op.or]: [{ user_one_id: user_id }, { user_two_id: user_id }]
      }
    })
      .then(rooms => {
        return rooms.map(room => Promise.resolve(room));
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

  function getUserChatInfo(req) {
    const user_id = req.query.user_id ? req.query.user_id : 1;
    const result = User.findAll({
      attributes: ["username", "avatar"],
      where: {
        user_id: user_id
      }
    })
      .then(info => {
        return Promise.resolve(info);
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

  return {
    getSubscription,
    getThreadVotes,
    getPostVotes,
    getRoomList,
    getUserChatInfo,
    getActiveUser
  };
};
