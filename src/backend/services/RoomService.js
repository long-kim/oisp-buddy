const models = require("backend/database/models");
const Room = models.Room;
const User = models.User;
const Friend = models.Friend;
const Op = require("sequelize").Op;

module.exports = passport => {
  function addRoom(data) {
    return Room.create(data).then(room => {
      return room;
    });
  }

  function getMessages(req, offset, limit) {
    const room_id = req.room_id;
    const result = Room.findByPk(room_id).then(room => {
      if (room) {
        return room
          .getMessages({
            include: [{ model: User }],
            offset: offset,
            order: [["msg_id", "DESC"]],
            limit: limit
          })
          .then(messages => {
            return Promise.resolve(messages.reverse());
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
    });

    return result;
  }
  function getRoom(req) {
    // Get room information base of participants
    const room_id = req.room_id ? req.room_id : 1;
    const user_id = req.user ? req.user.user_id : 1;
    let partArr = undefined;
    const participants = Friend.findByPk(room_id)
      .then(friend => {
        return Promise.resolve(friend);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    // return;
    const result = participants.then(res => {
      if (res.dataValues.user_one_id === user_id)
        return User.findOne({
          attributes: ["username", "avatar", "first_name", "last_name"],
          where: {
            user_id: res.dataValues.user_two_id
          }
        });
      else {
        return User.findOne({
          attributes: ["username", "avatar", "first_name", "last_name"],
          where: {
            user_id: res.dataValues.user_one_id
          }
        });
      }
    });

    return result;
  }

  function findRoom(req) {
    const user_id1 = req.user ? req.user.user_id : 1;
    const user_id2 = req.user_id ? parseInt(req.user_id) : 2;
    // console.log(req.user_id);
    console.log(user_id1, user_id2);
    const result = Friend.findOne({
      where: {
        [Op.or]: [
          { user_one_id: user_id1, user_two_id: user_id2 },
          { user_one_id: user_id2, user_two_id: user_id1 }
        ]
      }
      // [Op.or]: [{ user_one_id: user_id2 }, { user_two_id: user_id2 }]
    })
      .then(room => {
        return Promise.resolve(room);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    return result;
  }

  function getRoomParticipants(req) {
    const room_id = req.room_id ? req.room_id : 1;
    const result = Friend.findByPk(room_id)
      .then(result => {
        return Promise.resolve(result);
      })
      .catch(err => {
        return Promise.reject(err);
      });

    return result;
  }

  function newRoom(req) {
    const user_id = req.user ? req.user.user_id : 1;
    const new_user = req.user_id ? req.user_id : 9;
    let data = {
      status: 1,
      user_one_id: user_id,
      user_two_id: new_user
    };

    const friendPromise = Friend.create(data)
      .then(friend => {
        return Promise.resolve(friend);
        // Room.create({
        //   room_id: friend.friend_id,
        //   name: ""
        // }).then(room => {
        //   room;
        // });
      })
      .catch(err => {
        return Promise.reject(err);
      });

    const result = friendPromise
      .then(friend => {
        return Room.create({
          room_id: friend.friend_id,
          name: ""
        }).then(room => {
          return Promise.resolve(room);
        });
      })
      .catch(err => {
        return Promise.reject(err);
      });
    return friendPromise;
  }

  function getLastMessages(req) {
    const room_id = req.room_id ? req.room_id : 1;
    const result = Room.findByPk(room_id)
      .then(room => {
        return room.getMessages({
          order: [["msg_id", "DESC"]],
          limit: 1
        });
      })
      .then(messages => {
        return Promise.resolve(messages.reverse());
      })
      .catch(err => {
        return Promise.reject(err);
      });

    return result;
  }

  function editRoom(params, id) {
    return Room.findByPk(id)
      .then(room => {
        return room.update(params);
      })
      .then(room => {
        return room;
      });
  }

  function deleteRoom(id) {
    return Room.destroy({
      where: {
        room_id: id
      }
    });
  }

  return {
    addRoom,
    newRoom,
    editRoom,
    deleteRoom,
    getRoom,
    findRoom,
    getMessages,
    getLastMessages,
    getRoomParticipants
  };
};
