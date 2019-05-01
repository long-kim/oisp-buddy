'use strict';

const faker = require("faker");

const seed_data = [];

seed_data.push({
  content: faker.lorem.paragraph(10),
  posted_by: 2,
  parent_id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  content_of: 1
});

seed_data.push({
  content: faker.lorem.paragraph(10),
  posted_by: 1,
  parent_id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  content_of: 2
});

seed_data.push({
  content: faker.lorem.paragraph(10),
  posted_by: 1,
  parent_id: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
  content_of: 3
});

seed_data.push({
  content: faker.lorem.paragraph(10),
  posted_by: 2,
  parent_id: 4,
  createdAt: new Date(),
  updatedAt: new Date(),
  content_of: 4
});

seed_data.push({
  content: faker.lorem.paragraph(10),
  posted_by: 4,
  parent_id: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
  content_of: 5
});

seed_data.push({
  content: faker.lorem.paragraph(10),
  posted_by: 3,
  parent_id: 6,
  createdAt: new Date(),
  updatedAt: new Date(),
  content_of: 6
});

for (let i = 0; i < 60; ++i) {
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
