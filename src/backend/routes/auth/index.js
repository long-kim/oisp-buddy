const express = require("express");
const router = express.Router();

module.exports = passport => {
  const AuthController = require("../../controllers/AuthController")(passport);
  router.post(
    "/register",
    passport.authenticate("register"),
    (req, res, next) => {
      AuthController.add(req, res, next);
    }
  );

  router.post("/login", passport.authenticate("login"), (req, res, next) => {
    req.logIn(req.user, err => {
      AuthController.login(req, res, next);
    });
  });

  router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      console.log("User found in DB.");
      res.status(200).send({
        auth: true,
        user: req.user.toJSON(),
        message: "User found in DB."
      });
    }
  );

  return router;
};
