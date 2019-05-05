const express = require("express");
const router = express.Router();

module.exports = passport => {
  const AuthService = require("../../services/AuthService")(passport);
  router.get("/", (req, res) => {
    let result = AuthService.auth(req);
    if (result) {
      res.status(200).send("Authorized");
    } else {
      res.status(201).send("Unauthorized");
    }
  });

  router.post(
    "/register",
    passport.authenticate("register"),
    (req, res, next) => {
      AuthService.register(req, res, next).then(result => {
        res.json({ user_id: result, message: "User created." });
      });
    }
  );

  router.post("/login", passport.authenticate("login"), (req, res, next) => {
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
