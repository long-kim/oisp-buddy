const models = require("backend/database/models");
const Room = models.Room;
const User = models.User;

module.exports = passport => {
  function addRoom(data) {
    return Room.create(data).then(room => {
      return room;
    });
  }

  function getMessages(req, offset, limit) {
    const room_id = req.room_id;
    // console.log(offset);
    const result = Room.findByPk(room_id)
      .then(room => {
        return room.getMessages({
          include: [{ model: User }],
          offset: offset,
          order: [["msg_id", "DESC"]],
          limit: limit
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

  function getRoom(req) {
    const room_id = req.room_id ? req.room_id : 1;
    const result = Room.findByPk(room_id)
      .then(room => {
        return Promise.resolve(room);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    return result;
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
    editRoom,
    deleteRoom,
    getMessages,
    getLastMessages,
    getRoom
  };
};
