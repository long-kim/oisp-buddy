"use strict";

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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: true
    }
  );

  Room.associate = function(models) {
    // associations can be defined here
    Room.belongsToMany(models.User, {
      through: "user_rooms",
      foreignKey: "user_id"
    });
    Room.hasMany(models.Message, { foreignKey: "room_id" });
  };

  return Room;
};
