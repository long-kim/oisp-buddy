const express = require("express");
const router = express.Router();

module.exports = passport => {
  const AuthService = require("../../services/AuthService")(passport);
  router.get("/", (req, res) => {
    let result = AuthService.auth(req);
    if (result) {
      res.status(200).send("Authorized");
    } else {
      res.status(401).send("Unauthorized");
    }
  });

  router.post(
    "/register",
    passport.authenticate("register"),
    (req, res, next) => {
      AuthService.register(req, res, next);
    }
  );

  router.post("/login", passport.authenticate("auth"), (req, res, next) => {
    AuthService.login(req, res, next);
  });

  router.get("/logout", (req, res, next) => {
    AuthService.logout(req, res, next);
  });

  return router;
};
