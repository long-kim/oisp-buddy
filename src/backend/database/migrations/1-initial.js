'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Messages", deps: []
 * createTable "Posts", deps: []
 * createTable "Reports", deps: []
 * createTable "Rooms", deps: []
 * createTable "Threads", deps: []
 * createTable "Users", deps: []
 * createTable "UserRooms", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial",
    "created": "2019-04-28T13:09:39.822Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Messages",
        {

        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "Posts",
        {

        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "Reports",
        {

        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "Rooms",
        {

        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "Threads",
        {

        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "Users",
        {

        },
        {}
    ]
},
{
    fn: "createTable",
    params: [
        "UserRooms",
        {

        },
        {}
    ]
}
];

module.exports = {
    pos: 0,
    up: function (queryInterface, Sequelize) {
        var index = this.pos;
        return new Promise(function (resolve, reject) {
            function next() {
                if (index < migrationCommands.length) {
                    let command = migrationCommands[index];
                    console.log("[#" + index + "] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
