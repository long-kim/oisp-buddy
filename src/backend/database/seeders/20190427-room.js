'use strict';

const faker = require("faker");

const seed_data = [];
for (let i = 0; i < 10; ++i) {
  seed_data.push({
    roomName: faker.lorem.sentence(3),
    user_id: (Math.floor(Math.random() * 4) + 1).toString()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Rooms", seed_data);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTables("Rooms");
  }
};
