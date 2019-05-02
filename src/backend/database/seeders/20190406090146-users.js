"use strict";
const bcrypt = require("bcrypt");

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
    const seed_pwd = bcrypt.hashSync("123456", 10);
    return queryInterface.bulkInsert("Users", [
      {
        username: "longkh",
        email: "kimhoanglong.cs@gmail.com",
        password: seed_pwd,
        first_name: "Long",
        last_name: "Kim",
        avatar: "/images/avatars/avatar_long.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "jimtran98",
        email: "jimtran98@gmail.com",
        password: seed_pwd,
        first_name: "Thinh",
        last_name: "Tran",
        avatar: "/images/avatars/avatar_jim.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "jimcbl",
        email: "jimcbl@gmail.com",
        password: seed_pwd,
        first_name: "Jim",
        last_name: "Tran",
        avatar: "/images/avatars/avatar_jim.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "sarah123",
        email: "sarah@gmail.com",
        password: seed_pwd,
        first_name: "Sarah",
        last_name: "Vo",
        avatar: "/images/avatars/avatar_nhu.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "anng96",
        email: "anng96@gmail.com",
        password: seed_pwd,
        first_name: "An",
        last_name: "Nguyen",
        avatar: "/images/avatars/avatar_an.jpg",
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
