const models = require("backend/database/models/index");
const User = models.User;
const jwt = require("jsonwebtoken");

module.exports = passport => {
  function add(req, res, next) {
    req.logIn(req.user, err => {
      if (err) {
        console.error(err);
      }
      const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        dept: req.body.dept,
        year: req.body.dept
      };
      User.findOne({
        where: {
          username: data.username
        }
      }).then(user => {
        user
          .update({
            first_name: data.first_name,
            last_name: data.last_name,
            dept: data.dept,
            year: data.dept
          })
          .then(() => {
            console.log("User created.");
            res.status(200).send({ message: "User created." });
          });
      });
    });
  }

  function auth(req, res, next) {
    req.logIn(req.user, err => {
      User.findOne({
        where: {
          username: req.user.username
        }
      }).then(user => {
        const token = jwt.sign({ id: user.username }, process.env.SECRET_KEY);
        res.status(200).send({
          auth: true,
          token: token,
          message: "User signed in."
        });
      });
    });
  }

  return { add, auth }
}