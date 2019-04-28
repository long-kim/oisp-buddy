'use strict';

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      room_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      roomName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      messageLength: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {}
  );
  Room.associate = function (models) {
    // associations can be defined here
    Room.belongsToMany(models.User, { through: "UserRooms" });
    Room.hasMany(models.Message, { foreignKey: "room_id" });
  };
  return Room;
};
