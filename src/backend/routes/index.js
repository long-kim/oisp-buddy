const express = require("express");
const router = express.Router();

module.exports = passport => {
  router.use("/auth", require("./auth")(passport));
  router.use("/api", require("./api")(passport));

  return router;
};
