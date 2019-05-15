const models = require("backend/database/models");
const User = models.User;
const Relationship = models.Friend;
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

  function getUserInfo(req) {
    // console.log("this is req:", req.user ? req.user.user_id : 1);
    const user_id = req.user ? req.user.user_id : 1;
    // const user_id = req.user_id ? req.user_id : 1;
    const result = User.findByPk(user_id)
      .then(user => {
        return Promise.resolve(user);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    return result;
  }
  function getFriendInfo(req) {
    const user_id = req.query.user_id ? req.query.user_id : 1;
    console.log("my friend id", user_id);
    const result = User.findAll({
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

  function getFriendlist(req) {
    const user_id = req.user ? req.user.user_id : 1;
    // console.log("this is request:", req.user ? req.user.user_id : 1);
    const result = Relationship.findAll({
      where: {
        status: 1,
        [Op.or]: [{ user_one_id: user_id }, { user_two_id: user_id }]
      }
    })
      .then(relationship => {
        // console.log("relationship", Promise.resolve(relationship));
        return Promise.resolve(relationship);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    return result;
  }

  function getFriendStatus(req) {
    const user_id1 = req.query.user_id1 ? req.query.user_id1 : 1;
    const user_id2 = req.query.user_id2 ? req.query.user_id2 : 1;
    // console.log("user1: ", req.query.user_id1);
    // console.log("user2: ", req.query.user_id2);
    const result = Relationship.findAll({
      where: {
        user_one_id: user_id1,
        user_two_id: user_id2
      }
    })
      .then(relationship => {
        // console.log("relationship", Promise.resolve(relationship));
        return Promise.resolve(relationship);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    return result;
  }

  function getFriendNoti(req) {
    const action_user = req.query.action_user ? req.query.action_user : 1;
    console.log("action user: ", req.query.action_user);
    // console.log("my id: ", req.query.user_id);
    const result = Relationship.findAll({
      where: {
        [Op.or]: [{ user_one_id: action_user }, { user_two_id: action_user }],
        [Op.not]: [{ action_user_id: [action_user] }],
        status: 0
      }
    })
      .then(relationship => {
        // console.log("relationship", Promise.resolve(relationship));
        return Promise.resolve(relationship);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    return result;
  }

  function editFriend(req) {
    const id = req.body.id ? req.body.id : 0;
    console.log("edit Friend user1: ", req.body.id);
    console.log("status: ", req.body.status);
    // console.log(req);
    return Relationship.findByPk(id)
      .then(user => {
        return user.update({
          status: req.body.status,
          action_user_id: req.body.action_user_id,
          updatedAt: new Date()
        });
      })
      .then(user => {
        return user;
      });
  }

  function postFriend(req) {
    const user1 = req.user1 ? req.user1 : 0;
    const user2 = req.user2 ? req.user2 : 0;
    const action = req.action ? req.action : 0;
    console.log("in new friend user1", user1, " ", user2);

    return Relationship.create({
      user_one_id: user1,
      user_two_id: user2,
      status: 0,
      action_user_id: action
    })
      .then(relation => {
        return Promise.resolve(relation);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  function editUser_about(req) {
    // console.log("this is req:", req.user_id);
    const user_id = req.user_id ? req.user_id : 1;

    return User.findByPk(user_id)
      .then(user => {
        return user.update({
          about: req.about
        });
      })
      .then(user => {
        return user;
      });
  }

  function editUser_avatar(req) {
    // console.log("this is req:", req.user_id);
    const user_id = req.user_id ? req.user_id : 1;

    return User.findByPk(user_id)
      .then(user => {
        return user.update({
          avatar: req.avatar
        });
      })
      .then(user => {
        return user;
      });
  }

  function editUser_cover(req) {
    // console.log("this is req:", req.user_id);
    const user_id = req.user_id ? req.user_id : 1;

    return User.findByPk(user_id)
      .then(user => {
        return user.update({
          cover: req.cover
        });
      })
      .then(user => {
        return user;
      });
  }

  function editUser_name(req) {
    // console.log("this is req:", req.user_id);
    const user_id = req.user_id ? req.user_id : 1;

    return User.findByPk(user_id)
      .then(user => {
        return user.update({
          first_name: req.first_name,
          last_name: req.last_name
        });
      })
      .then(user => {
        return user;
      });
  }

  function editUser_year(req) {
    // console.log("this is req:", req.user_id);
    const user_id = req.user_id ? req.user_id : 1;

    return User.findByPk(user_id)
      .then(user => {
        return user.update({
          year: req.year
        });
      })
      .then(user => {
        return user;
      });
  }

  function editUser_dept(req) {
    // console.log("this is req:", req.user_id);
    const user_id = req.user_id ? req.user_id : 1;

    return User.findByPk(user_id)
      .then(user => {
        return user.update({
          dept: req.major
        });
      })
      .then(user => {
        return user;
      });
  }

  // function editUser_password(req) {
  //   // console.log("this is req:", req.user_id);
  //   const user_id = req.user_id ? req.user_id : 1;

  //   return User.findByPk(user_id)
  //     .then(user => {
  //       return user.update({
  //         passport: req.passport
  //       });
  //     })
  //     .then(user => {
  //       return user;
  //     });
  // }

  return {
    getSubscription,
    getThreadVotes,
    getPostVotes,
    getUserInfo,
    editUser_about,
    editUser_avatar,
    editUser_cover,
    editUser_name,
    editUser_dept,
    editUser_year,
    getFriendlist,
    getFriendInfo,
    getFriendStatus,
    editFriend,
    getFriendNoti,
    postFriend
    // editUser_password
  };
};
