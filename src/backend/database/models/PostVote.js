"use strict";

module.exports = (sequelize, DataTypes) => {
  const PostVote = sequelize.define(
    "PostVoteModel",
    {
      voted: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      }
    },
    {
      tableName: "post_votes"
    }
  );
  return PostVote;
};
