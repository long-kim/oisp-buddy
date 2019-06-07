const models = require("../models");
const Room = models.Room;
const User = models.User;
const Op = require("sequelize").Op;

module.exports = passport => {
  async function getRooms(user_id) {
    const rooms = await Room.findAll({
      where: {
        [Op.or]: [{ user_one_id: user_id }, { user_two_id: user_id }]
      }
    });
    const room_objs = rooms.map(room => {
      return room.toJSON();
    });
    const data = [];
    for (const room_obj of room_objs) {
      let user = {};
      if (room_obj.user_one_id === user_id) {
        user = await User.findOne({
          attributes: ["user_id", "avatar", "first_name", "last_name"],
          where: {
            user_id: room_obj.user_two_id
          }
        });
      } else {
        user = await User.findOne({
          attributes: ["user_id", "avatar", "first_name", "last_name"],
          where: {
            user_id: room_obj.user_one_id
          }
        });
      }
      const return_data = {
        room_id: room_obj.room_id,
        user: user.toJSON()
      }
      data.push(return_data);
    }
    return data;
  }

  return { getRooms };
};
