// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema({
//   userID: Number,
//   time: Date,
//   content: String
// });

// module.exports = mongoose.model("Message", messageSchema);

("use strict");

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      mess_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // status: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: 0
      // },
      timestramp: DataTypes.DATE
    },
    {}
  );
  Message.associate = function(models) {
    // associations can be defined here
    // Message.belongsTo(models.Room, { foreignKey: "author_id" });
    // Message.hasMany(models.Post, { foreignKey: "parent_id" });
    // Message.hasMany(models.Report, { foreignKey: "thread_id" });
  };
  return Message;
};
