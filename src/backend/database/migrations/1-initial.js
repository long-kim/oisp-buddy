'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Rooms", deps: []
 * createTable "Topics", deps: []
 * createTable "Users", deps: []
 * createTable "Threads", deps: [Users]
 * createTable "Messages", deps: [Users, Rooms]
 * createTable "subscriptions", deps: [Threads, Users]
 * createTable "Posts", deps: [Users, Threads, Threads]
 * createTable "thread_topics", deps: [Threads, Topics]
 * createTable "thread_votes", deps: [Threads, Users]
 * createTable "post_votes", deps: [Posts, Users]
 * createTable "Reports", deps: [Users, Threads]
 * createTable "user_rooms", deps: [Rooms, Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial",
    "created": "2019-05-01T11:40:46.957Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Rooms",
            {
                "room_id": {
                    "type": Sequelize.INTEGER,
                    "field": "room_id",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "avatar": {
                    "type": Sequelize.STRING,
                    "field": "avatar",
                    "allowNull": true
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
            "Topics",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title",
                    "defaultValue": "",
                    "allowNull": false
                },
                "desc": {
                    "type": Sequelize.STRING,
                    "field": "desc",
                    "defaultValue": ""
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
                "avatar": {
                    "type": Sequelize.STRING,
                    "field": "avatar"
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
            "Messages",
            {
                "msg_id": {
                    "type": Sequelize.INTEGER,
                    "field": "msg_id",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "content": {
                    "type": Sequelize.STRING,
                    "field": "content",
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
                "sender_id": {
                    "type": Sequelize.INTEGER,
                    "field": "sender_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "user_id"
                    },
                    "allowNull": true
                },
                "room_id": {
                    "type": Sequelize.INTEGER,
                    "field": "room_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Rooms",
                        "key": "room_id"
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
            "subscriptions",
            {
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
                "thread_id": {
                    "type": Sequelize.INTEGER,
                    "field": "thread_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Threads",
                        "key": "thread_id"
                    },
                    "primaryKey": true
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "user_id"
                    },
                    "primaryKey": true
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
                },
                "content_of": {
                    "type": Sequelize.INTEGER,
                    "field": "content_of",
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
            "thread_topics",
            {
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
                "thread_id": {
                    "type": Sequelize.INTEGER,
                    "field": "thread_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Threads",
                        "key": "thread_id"
                    },
                    "primaryKey": true
                },
                "topic_id": {
                    "type": Sequelize.INTEGER,
                    "field": "topic_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Topics",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "thread_votes",
            {
                "voted": {
                    "type": Sequelize.INTEGER,
                    "field": "voted",
                    "allowNull": false,
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
                "thread_id": {
                    "type": Sequelize.INTEGER,
                    "field": "thread_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Threads",
                        "key": "thread_id"
                    },
                    "primaryKey": true
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "user_id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "post_votes",
            {
                "voted": {
                    "type": Sequelize.INTEGER,
                    "field": "voted",
                    "allowNull": false,
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
                "post_id": {
                    "type": Sequelize.INTEGER,
                    "field": "post_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Posts",
                        "key": "post_id"
                    },
                    "primaryKey": true
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "user_id"
                    },
                    "primaryKey": true
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
    },
    {
        fn: "createTable",
        params: [
            "user_rooms",
            {
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
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Rooms",
                        "key": "room_id"
                    },
                    "primaryKey": true
                },
                "room_id": {
                    "type": Sequelize.INTEGER,
                    "field": "room_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "user_id"
                    },
                    "primaryKey": true
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
