"use strict";

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
    return queryInterface.bulkInsert("Users", [
      {
        username: "longkh",
        email: "kimhoanglong.cs@gmail.com",
        password: "123456",
        first_name: "Long",
        last_name: "Kim",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "jimcbl",
        email: "jimcbl@gmail.com",
        password: "123456",
        first_name: "Jim",
        last_name: "Tran",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "sarah123",
        email: "sarah@gmail.com",
        password: "123456",
        first_name: "Sarah",
        last_name: "Vo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "anng96",
        email: "anng96@gmail.com",
        password: "123456",
        first_name: "An",
        last_name: "Nguyen",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.dropTables("Users");
  }
};
