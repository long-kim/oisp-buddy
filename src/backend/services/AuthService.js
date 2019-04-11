const models = require("backend/database/models");
const jwt = require("jsonwebtoken");
const User = models.User;

module.exports = passport => {
  function auth(req) {
    let result = false;
    if (req.session.passport) {
      result = true;
    }
    return result;
  }

  function register(req, res, next) {
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
          })
      });
    });
  }

  function login(req, res, next) {
    req.logIn(req.user, err => {
      User.findOne({
        where: {
          username: req.user.username
        }
      }).then(user => {
        const token = jwt.sign({id: user.user_id }, process.env.JWT_SECRET);
        res.status(200).send({
          auth: true,
          token: token,
          message: "User signed in."
        });
      });
    });
  }

  function logout(req, res, next) {
    req.logOut();
    req.session = null;
    res.status(200).send("Logged out.");
  }

  return { auth, register, login, logout };
};
