"use strict";

const seed_data = [];

for (let j = 0; j < 2; j++) {
  for (let i = 0; i < 4; i++) {
    if (i + j + 2 > 5) {
      break;
    }
    seed_data.push({
      user_id: i + 1,
      room_id: i + j * 4 + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    seed_data.push({
      user_id: i + j + 2,
      room_id: i + j * 4 + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

for (let i = 8; i < 15; i++) {
  let a = Math.floor(Math.random() * 4) + 1;
  let b = Math.floor(Math.random() * 4) + 1;
  if (a !== b) {
    seed_data.push({
      user_id: a,
      room_id: i,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    seed_data.push({
      user_id: b,
      room_id: i,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

// console.log(seed_data);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user_rooms", seed_data);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTables("user_rooms");
  }
};
