"use strict";

module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define(
    "Friend",
    {
      friend_id: {
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
    {}
  );
  Friend.removeAttribute("createdAt");
  Friend.removeAttribute("updatedAt");

  Friend.associate = function(models) {
    Friend.belongsTo(models.User, { foreignKey: "user_one_id" });
    Friend.belongsTo(models.User, { foreignKey: "user_two_id" });
    Friend.hasOne(models.Room, { foreignKey: "room_id" });
  };
  return Friend;
};
