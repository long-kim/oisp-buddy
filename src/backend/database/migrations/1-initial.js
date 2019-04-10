'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "Threads", deps: [Users]
 * createTable "Posts", deps: [Users, Threads]
 * createTable "Reports", deps: [Users, Threads]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial",
    "created": "2019-04-08T00:28:48.616Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Users",
            {
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "username": {
                    "type": Sequelize.STRING(20),
                    "field": "username",
                    "allowNull": false,
                    "validate": {
                        "is": {},
                        "len": [6, 20]
                    },
                    "unique": true
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": true
                    },
                    "allowNull": false,
                    "unique": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                "role": {
                    "type": Sequelize.ENUM('user', 'admin'),
                    "field": "role",
                    "allowNull": false,
                    "defaultValue": "user"
                },
                "first_name": {
                    "type": Sequelize.STRING(30),
                    "field": "first_name",
                    "validate": {
                        "isAlpha": true
                    }
                },
                "last_name": {
                    "type": Sequelize.STRING(60),
                    "field": "last_name",
                    "validate": {
                        "isAlpha": true
                    }
                },
                "dept": {
                    "type": Sequelize.STRING(50),
                    "field": "dept"
                },
                "year": {
                    "type": Sequelize.TINYINT,
                    "field": "year"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Threads",
            {
                "thread_id": {
                    "type": Sequelize.INTEGER,
                    "field": "thread_id",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title",
                    "allowNull": false
                },
                "score": {
                    "type": Sequelize.INTEGER,
                    "field": "score",
                    "defaultValue": 0,
                    "allowNull": false
                },
                "favorites": {
                    "type": Sequelize.INTEGER,
                    "field": "favorites",
                    "defaultValue": 0
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "author_id": {
                    "type": Sequelize.INTEGER,
                    "field": "author_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "user_id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Posts",
            {
                "post_id": {
                    "type": Sequelize.INTEGER,
                    "field": "post_id",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "content": {
                    "type": Sequelize.STRING(2000),
                    "field": "content",
                    "allowNull": false
                },
                "score": {
                    "type": Sequelize.INTEGER,
                    "field": "score",
                    "defaultValue": 0,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "posted_by": {
                    "type": Sequelize.INTEGER,
                    "field": "posted_by",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "user_id"
                    },
                    "allowNull": true
                },
                "parent_id": {
                    "type": Sequelize.INTEGER,
                    "field": "parent_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Threads",
                        "key": "thread_id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Reports",
            {
                "report_id": {
                    "type": Sequelize.INTEGER,
                    "field": "report_id",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "content": {
                    "type": Sequelize.STRING(200),
                    "field": "content",
                    "allowNull": false
                },
                "response": {
                    "type": Sequelize.ENUM('resolved', 'open'),
                    "field": "response",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "reported_by": {
                    "type": Sequelize.INTEGER,
                    "field": "reported_by",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "user_id"
                    },
                    "allowNull": true
                },
                "thread_id": {
                    "type": Sequelize.INTEGER,
                    "field": "thread_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Threads",
                        "key": "thread_id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
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