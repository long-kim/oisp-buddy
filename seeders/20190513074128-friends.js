"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Friends", [
      {
        user_one_id: 1,
        user_two_id: 2,
        status: 1,
        action_user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_one_id: 2,
        user_two_id: 3,
        status: 1,
        action_user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_one_id: 2,
        user_two_id: 5,
        status: 1,
        action_user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_one_id: 2,
        user_two_id: 6,
        status: 1,
        action_user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_one_id: 1,
        user_two_id: 3,
        status: 1,
        action_user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_one_id: 1,
        user_two_id: 6,
        status: 2,
        action_user_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_one_id: 3,
        user_two_id: 4,
        action_user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_one_id: 3,
        user_two_id: 7,
        status: 1,
        action_user_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_one_id: 4,
        user_two_id: 7,
        status: 2,
        action_user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_one_id: 5,
        user_two_id: 7,
        action_user_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_one_id: 6,
        user_two_id: 7,
        status: 1,
        action_user_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTables("Friends");
  }
};
