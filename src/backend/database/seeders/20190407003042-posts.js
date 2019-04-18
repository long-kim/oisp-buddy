"use strict";

const faker = require("faker");

const seed_data = [];
for (let i = 0; i < 30; ++i) {
  seed_data.push({
    content: faker.lorem.paragraph(10),
    posted_by: Math.floor(Math.random() * 4) + 1,
    parent_id: Math.floor(Math.random() * 6) + 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", seed_data);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTables("Posts");
  }
};
