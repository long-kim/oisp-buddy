const router = require("express").Router();
const models = require("../../database/models/index");
const User = require("backend/database/chat/User.js");

router.get("/", (req, res, next) => {
  const UserMySQL = models.User;
  UserMySQL.findAll({
    order: [["user_id", "ASC"]]
  }).then(users => {
    res.json({ users: users.map(user => user.toJSON()) });
  });
});

router.get("/mongo", (req, res) => {
  User.find().then(doc => {
    res.json(doc);
  });
});

module.exports = router;
