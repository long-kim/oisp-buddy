"use strict";

const faker = require("faker");
const slugify = require("slugify");
const seed_data = [];

for (let i = 0; i < 10; ++i) {
  let name = faker.lorem.words(Math.floor(Math.random() * 3) + 1);
  seed_data.push({
    name: slugify(name),
    title: name,
    desc: faker.lorem.sentence(),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("topics", seed_data);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTables("topics");
  }
};
