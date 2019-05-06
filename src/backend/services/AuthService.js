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
      })
        .then(user => {
          if (user) {
            return user.update({
              first_name: data.first_name,
              last_name: data.last_name,
              dept: data.dept,
              year: data.dept
            });
          }
        })
        .then(user => {
          console.log("User created.");
          return Promise.resolve(user.user_id);
        });
    });
  }

  async function login(req, res, next) {
    const user = await User.findOne({ where: { username: req.user.username } });
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET);
    const data = {
      auth: true,
      token: token,
      user_obj: user,
      message: "User signed in."
    };
    return data;
  }

  function logout(req, res, next) {
    req.logOut();
    req.session = null;
    res.clearCookie("session");
  }

  return { auth, register, login, logout };
};
