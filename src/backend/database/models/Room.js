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
      status: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        allowNULL: false
      }
    },
    {
      timestamps: false
    }
  );

  Room.associate = function(models) {
    Room.belongsTo(models.User, { foreignKey: "user_one_id" });
    Room.belongsTo(models.User, { foreignKey: "user_two_id" });
  };
  return Room;
};
