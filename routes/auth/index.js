const express = require("express");
const router = express.Router();
const _ = require("lodash");

module.exports = passport => {
  const AuthService = require("../../services/AuthService")(passport);
  router.get("/", (req, res) => {
    let user_obj = AuthService.auth(req);
    if (!_.isNull(user_obj)) {
      const user = {
        firstName: user_obj.first_name,
        user_id: user_obj.user_id,
        username: user_obj.username,
        avatar: user_obj.avatar,
        cover: user_obj.cover
      };
      res.status(200).send(user);
    } else {
      res.status(201).send(null);
    }
  });

  router.post(
    "/signup",
    passport.authenticate("register"),
    (req, res, next) => {
      const result = AuthService.register(req, res, next);
      res.json({ user_id: result, message: "User created." });
    }
  );

  router.post("/login", passport.authenticate("login"), (req, res, next) => {
    AuthService.login(req, res, next).then(result => {
      res.json(result);
    });
  });

  router.post("/admin", passport.authenticate("admin"), (req, res, next) => {
    AuthService.login(req, res, next).then(result => {
      res.json(result);
    });
  });

  router.get("/logout", (req, res, next) => {
    AuthService.logout(req, res, next);
    res.send("Logged out.");
  });

  return router;
};
