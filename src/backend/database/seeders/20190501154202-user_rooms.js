"use strict";

const seed_data = [];

for (let i = 1; i < 5; i++) {
  seed_data.push({
    user_id: i,
    room_id: i
  });
  seed_data.push({
    user_id: i + 1,
    room_id: i
  });
}

for (let i = 5; i < 15; i++) {
  let a = Math.floor(Math.random() * 4) + 1;
  let b = Math.floor(Math.random() * 4) + 1;
  if (a !== b) {
    seed_data.push({
      user_id: a,
      room_id: i
    });
    seed_data.push({
      user_id: b,
      room_id: i
    });
  }
}

console.log(seed_data);
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
