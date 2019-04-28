const router = require("express").Router();
const models = require("../../database/models/index");


router.get("/", (req, res, next) => {
  const UserMySQL = models.User;
  UserMySQL.findAll({
    order: [["user_id", "ASC"]]
  }).then(users => {
    res.json({ users: users.map(user => user.toJSON()) });
  });
});

module.exports = router;
