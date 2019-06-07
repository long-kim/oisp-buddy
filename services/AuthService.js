const models = require("../models");
const User = models.User;

module.exports = passport => {
  function auth(req) {
    let result = null;
    if (req.session.passport && req.user !== undefined) {
      result = req.user.toJSON();
    }
    return result;
  }

  function register(req, res, next) {
    req.logIn(req.user, err => {
      if (err) {
        console.error(err);
        return true;
      } else {
        return false;
      }
    });
  }

  async function login(req, res, next) {
    const user = await User.findOne({ where: { username: req.user.username } });
    const data = {
      auth: true,
      user_obj: user,
      message: "User signed in."
    };
    return data;
  }

  async function admin(req, res, next) {
    const user = await User.findOne({
      where: { username: req.user.username }
    });
    const data = {
      auth: true,
      user_obj: user,
      message: "User signed in.",
      token: "admin"
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
