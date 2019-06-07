"use strict";

module.exports = (sequelize, DataTypes) => {
  const ThreadTopic = sequelize.define(
    "ThreadTopicModel",
    {},
    {
      tableName: "thread_topics"
    }
  );
  return ThreadTopic;
};
