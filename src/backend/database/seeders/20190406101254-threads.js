'use strict';

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Threads", [
      {
        title: faker.lorem.sentence(),
        author_id: "2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: faker.lorem.sentence(),
        author_id: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: faker.lorem.sentence(),
        author_id: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: faker.lorem.sentence(),
        author_id: "2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: faker.lorem.sentence(),
        author_id: "4",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: faker.lorem.sentence(),
        author_id: "3",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTables("Threads");
  }
};
