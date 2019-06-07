const models = require("../models");
const User = models.User;
const Friend = models.Friend;
const Thread = models.Thread;
const Op = require("sequelize").Op;
const _ = require("lodash");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

module.exports = passport => {
  async function getInfo(user_id, currentUser) {
    const user = await User.findByPk(user_id, {
      include: [
        {
          model: Thread
        }
      ]
    });
    const friends = await Friend.findAll({
      where: {
        status: 1,
        [Op.or]: [{ user_one_id: user_id }, { user_two_id: user_id }]
      }
    });
    const user_obj = user.toJSON();
    const friend_objs = friends.map(friend => {
      return friend.toJSON();
    });
    let status = -1;
    let action_id = 0;
    const relationship = await Friend.findOne({
      where: {
        [Op.or]: [
          { user_one_id: currentUser, user_two_id: user_id },
          { user_one_id: user_id, user_two_id: currentUser }
        ]
      }
    });
    if (!_.isNull(relationship)) {
      const relationship_obj = relationship.toJSON();
      status = relationship_obj.status;
      action_id = relationship_obj.action_user_id;
    }
    let friends_data = [];
    for (const friend_obj of friend_objs) {
      let friend_id;
      if (friend_obj.user_one_id === parseInt(user_id)) {
        friend_id = friend_obj.user_two_id;
      } else {
        friend_id = friend_obj.user_one_id;
      }
      const friend = await User.findByPk(friend_id);
      const friend_data = friend.toJSON();
      friends_data.push({
        user_id: friend_data.user_id,
        name: `${friend_data.first_name} ${friend_data.last_name}`,
        dept: friend_data.dept,
        avatar: friend_data.avatar
      });
    }
    // return user_obj;
    return {
      user_id: user_obj.user_id,
      name: `${user_obj.first_name} ${user_obj.last_name}`,
      avatar: user_obj.avatar,
      cover: user_obj.cover,
      about: user_obj.about,
      dept: user_obj.dept,
      year: user_obj.year,
      joined: user_obj.createdAt,
      friends: friends_data,
      threads: user_obj.Threads,
      status: status,
      action_id: action_id
    };
  }

  async function editFriendStatus(user1, user2, status, action_id) {
    const user_one_id = user1;
    const user_two_id = user2;
    if (status === 0) {
      const [relation, created] = await Friend.findOrCreate({
        where: {
          [Op.or]: [
            { user_one_id: user_one_id, user_two_id: user_two_id },
            { user_one_id: user_two_id, user_two_id: user_one_id }
          ],
          status: status
        },
        defaults: {
          user_one_id: user_one_id,
          user_two_id: user_two_id,
          status: status,
          action_user_id: action_id
        }
      });
      if (!created) {
        const result = await Friend.update(
          {
            status: 1,
            action_user_id: action_id
          },
          {
            where: {
              [Op.or]: [
                { user_one_id: user_one_id, user_two_id: user_two_id },
                { user_one_id: user_two_id, user_two_id: user_one_id }
              ]
            }
          }
        );
        return result;
      }
      return relation.toJSON();
    }
  }

  async function getFriendRequests(user_id) {
    const requests = await Friend.findAll({
      where: {
        [Op.or]: [{ user_one_id: user_id }, { user_two_id: user_id }],
        [Op.not]: [{ action_user_id: [user_id] }],
        status: 0
      }
    });
    const request_objs = requests.map(request => {
      return request.toJSON();
    });
    let request_data = [];
    for (const request_obj of request_objs) {
      const user = await User.findByPk(request_obj.action_user_id);
      const user_obj = user.toJSON();
      const data = {
        user_id: request_obj.action_user_id,
        firstName: user_obj.first_name,
        lastName: user_obj.last_name,
        avatar: user_obj.avatar
      };
      request_data.push(data);
    }
    return request_data;
  }

  async function getRoomList(user_id) {
    const friends = await Friend.findAll({
      where: {
        status: 1,
        [Op.or]: [{ user_one_id: user_id }, { user_two_id: user_id }]
      }
    });
    room_objs = [];
    for (const friend of friends) {
      const room = await friend.getRoom();
      const room_obj = room.toJSON();
      room_objs.push(room_obj);
    }
  }

  async function edit(user_id, content) {
    const user = await User.findByPk(user_id);
    if (content.password !== undefined) {
      content.password = bcrypt.hashSync(content.password, SALT_ROUNDS)
    } else if (content.password === "") {
      content.password = user.password;
    }
    return await user.update({
      ...content
    });
  }

  function getAllUser(req) {
    const result = User.findAll()
      .then(info => {
        return Promise.resolve(info);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    return result;
  }

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

  return {
    getInfo,
    getFriendRequests,
    editFriendStatus,
    edit,
    getSubscription,
    getThreadVotes,
    getPostVotes,
    getAllUser
  };
};
