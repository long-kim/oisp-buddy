"use strict";

const faker = require("faker");

const seed_data = [];

for (let i = 1; i < 7; i++) {
  seed_data.push({
    name: "",
    avatar: faker.image.avatar(),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

// console.log(seed_data);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Rooms", seed_data);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTables("Rooms");
  }
};
