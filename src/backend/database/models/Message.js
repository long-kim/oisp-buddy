"use strict";

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      msg_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING(1000),
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, { foreignKey: "sender_id" });
    Message.belongsTo(models.Room, { foreignKey: "room_id" });
  };
  return Message;
};
