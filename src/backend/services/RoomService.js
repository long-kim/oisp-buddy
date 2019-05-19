const models = require("backend/database/models");
const Room = models.Room;
const User = models.User;
const Op = require("sequelize").Op;

module.exports = passport => {
  function addRoom(data) {
    return Room.create(data).then(room => {
      return room;
    });
  }

  function getRoom(req) {
    // Get your friends avatar & full name
    const room_id = req.room_id ? req.room_id : 1;
    const user_id = req.user ? req.user.user_id : 1;

    const participants = Room.findByPk(room_id)
      .then(room => {
        return Promise.resolve(room);
      })
      .catch(err => {
        return Promise.reject(err);
      });

    const result = participants.then(res => {
      if (res.dataValues.user_one_id === user_id)
        return User.findOne({
          attributes: ["avatar", "first_name", "last_name"],
          where: {
            user_id: res.dataValues.user_two_id
          }
        });
      else {
        return User.findOne({
          attributes: ["avatar", "first_name", "last_name"],
          where: {
            user_id: res.dataValues.user_one_id
          }
        });
      }
    });

    return result;
  }

  function getRoomFull(req) {
    // Get full room information of 2 user
    const room_id = req.room_id ? req.room_id : 1;
    const participants = Room.findByPk(room_id)
      .then(room => {
        return Promise.resolve(room);
      })
      .catch(err => {
        return Promise.reject(err);
      });

    const result = participants.then(res => {
      return User.findAll({
        attributes: [
          "username",
          "avatar",
          "first_name",
          "last_name",
          "user_id"
        ],
        where: {
          [Op.or]: [
            { user_id: res.dataValues.user_one_id },
            { user_id: res.dataValues.user_two_id }
          ]
        }
      });
    });

    return result;
  }

  function findRoom(req) {
    const user_id1 = req.user ? req.user.user_id : 1;
    const user_id2 = req.user_id ? parseInt(req.user_id) : 2;
    const result = Room.findOne({
      where: {
        [Op.or]: [
          { user_one_id: user_id1, user_two_id: user_id2 },
          { user_one_id: user_id2, user_two_id: user_id1 }
        ]
      }
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
    const result = Room.findByPk(room_id)
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
    const result = Room.create(data)
      .then(room => {
        return Promise.resolve(room);
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
    getRoomFull,
    getRoomParticipants
  };
};
