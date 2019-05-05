"use strict";

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING(2000),
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      timestamps: true
    }
  );
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: "posted_by" });
    Post.belongsTo(models.Thread, { foreignKey: "parent_id" });
    Post.belongsToMany(models.User, {
      as: "PostVote",
      through: models.PostVoteModel,
      foreignKey: "post_id"
    });
  };
  return Post;
};
