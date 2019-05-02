"use strict";

const faker = require("faker");
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
const seed_data = [];

for (let i = 0; i < 15; i++) {
  seed_data.push({
    name: toTitleCase(faker.lorem.words(Math.floor(Math.random() * 2) + 2)),
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
