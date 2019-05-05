const router = require("express").Router();
const models = require("../../database/models/index");
const User = models.User;
const jwt = require("jsonwebtoken");
/*router.get("/", (req, res, next) => {
  const User = models.User
  User.findAll({
    order: [["user_id", "ASC"]]
  }).then(users => {
    res.json({ users: users.map(user => users.toJSON()) });
    res.json(users.toJSON());
  });
});
module.exports = router;*/


module.exports = passport => {
  router.get("/", (req, res, next) => {
    Thread.findAll({
      order: [["user_id", "ASC"]]
    }).then(users => {
      res.json({ users: users.map(user => users.toJSON()) });
    });
  });
  router.get(
    "/view/:userId",

    (req, res, next) => {
      let id=jwt.decode(req.params.userId).id;
      User.findByPk(id)
        .then(user => {
          res.json(user.toJSON());
          //console.log(user);
        })
        .catch(err => console.error(err));
    }
  );
  return router;
}