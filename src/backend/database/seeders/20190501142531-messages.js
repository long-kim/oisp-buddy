"use strict";

const faker = require("faker");

const seed_data = [];

for (let j = 0; j < 2; j++) {
  for (let i = 0; i < 4; i++) {
    if (i + j + 2 > 5) {
      break;
    }
    let user_arr = [i + 1, i + j + 2];
    for (let m = 0; m < 20; m++) {
      seed_data.push({
        content: faker.lorem.words(),
        sender_id: user_arr[Math.round(Math.random())],
        room_id: i + j * 4 + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Messages", seed_data);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTables("Messages");
  }
};
