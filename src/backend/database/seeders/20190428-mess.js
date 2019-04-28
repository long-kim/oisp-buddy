"use strict";

const faker = require("faker");

const seed_data = [];
for (let i = 0; i < 30; ++i) {
  seed_data.push({
    content: faker.lorem.words(),
    sent_by: (Math.floor(Math.random() * 4) + 1).toString(),
    room_id: (Math.floor(Math.random() * 9) + 1).toString(),
    timestramp: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Messages", seed_data);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTables("Messages");
  }
};
