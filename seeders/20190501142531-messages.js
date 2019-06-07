"use strict";

const faker = require("faker");

const seed_data = [];

let user_arr = [1, 2];
for (let m = 0; m < 20; m++) {
  seed_data.push({
    content: faker.lorem.words(),
    sender_id: user_arr[Math.round(Math.random())],
    room_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
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
