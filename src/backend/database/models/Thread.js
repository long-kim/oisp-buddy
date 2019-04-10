"use strict";

module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define(
    "Thread",
    {
      thread_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      favorites: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {}
  );
  Thread.associate = function(models) {
    // associations can be defined here
    Thread.belongsTo(models.User, { foreignKey: "author_id" });
    Thread.hasMany(models.Post, { foreignKey: "parent_id" });
    Thread.hasMany(models.Report, { foreignKey: "thread_id" });
  };
  return Thread;
};