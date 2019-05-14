"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Friends", [
      {
        user_one_id: 1,
        user_two_id: 2,
        status: 1
      },
      {
        user_one_id: 1,
        user_two_id: 3,
        status: 1
      },
      {
        user_one_id: 1,
        user_two_id: 4,
        status: 1
      },
      {
        user_one_id: 1,
        user_two_id: 5,
        status: 1
      },

      {
        user_one_id: 2,
        user_two_id: 3,
        status: 1
      },
      {
        user_one_id: 2,
        user_two_id: 5,
        status: 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTables("Friends");
  }
};
