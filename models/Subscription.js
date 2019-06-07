"use strict";

module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define(
    "SubscriptionModel",
    {},
    {
      tableName: "subscriptions"
    }
  );
  return Subscription;
};
