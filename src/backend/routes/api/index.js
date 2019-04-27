const router = require("express").Router();

module.exports = passport => {
  router.use("/users", require("./users"));
  router.use("/chats", require("./chats")(passport));
  router.use("/threads", require("./threads")(passport));
  router.use("/posts", require("./posts")(passport));
  return router;
};
