("use strict");

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
      }
      //   timestramp: {
      //     type: DataTypes.DATE,
      //     allowNull: false
      //   }
    },
    {}
  );
  Room.associate = function(models) {
    // associations can be defined here
    Room.belongsToMany(models.User, { foreignKey: "room_id" });
    Room.hasMany(models.Message, { foreignKey: "room_id" });
  };
  return Message;
};
