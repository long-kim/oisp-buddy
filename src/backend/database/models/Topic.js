const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      desc: {
        type: DataTypes.STRING,
        defaultValue: ""
      }
    },
    {}
  );

  Topic.associate = function(models) {
    Topic.belongsToMany(models.Thread, {
      through: models.ThreadTopicModel,
      foreignKey: "topic_id"
    })
  }

  return Topic;
};
