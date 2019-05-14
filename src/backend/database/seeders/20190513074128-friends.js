"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Friends", [
      {
        user_one_id: 1,
        user_two_id: 2,
        status: 1,
        action_user_id: 1
      },
      {
        user_one_id: 1,
        user_two_id: 3,
        status: 1,
        action_user_id: 1
      },
      {
        user_one_id: 1,
        user_two_id: 2,
        status: 4,
        action_user_id: 4
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTables("Friends");
  }
};
