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
        about: "I'm Gosu, I'm THE best",
        dept: "Computer Science",
        year: "2016",
        avatar: "/images/avatars/avatar_long.jpg",
        cover:
          "http://thewowstyle.com/wp-content/uploads/2015/01/cover-facebook-1.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "jimcbl",
        email: "jimcbl@gmail.com",
        password: seed_pwd,
        first_name: "Jim",
        last_name: "Tran",
        about: "Hey there I'm Jim, I love Apple",
        dept: "Computer Science",
        year: "2016",
        avatar: "/images/avatars/avatar_jim.jpg",
        cover:
          "http://thewowstyle.com/wp-content/uploads/2015/01/funny-superman_82980.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "sarah123",
        email: "sarah@gmail.com",
        password: seed_pwd,
        first_name: "Sarah",
        last_name: "Vo",
        dept: "Computer Science",
        year: "2016",
        about: "I rather not say anything",
        cover:
          "https://img.wallpapersafari.com/desktop/1680/1050/87/94/BuaEIn.jpg",
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
        dept: "Computer Science",
        year: "2016",
        avatar: "/images/avatars/avatar_an.jpg",
        cover:
          "http://thewowstyle.com/wp-content/uploads/2015/01/Facebook-Cover-With-Funny-Quotes-8.jpg",
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
