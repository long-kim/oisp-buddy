"use strict";

module.exports = (sequelize, DataTypes) => {
  const ThreadVote = sequelize.define(
    "ThreadVoteModel",
    {
      voted: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      }
    },
    {
      tableName: "thread_votes"
    }
  );
  return ThreadVote;
};
