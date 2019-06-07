const router = require("express").Router();

module.exports = passport => {
  router.use("/users", require("./users")(passport));
  router.use("/threads", require("./threads")(passport));
  router.use("/posts", require("./posts")(passport));
  router.use("/topics", require("./topics")(passport));
  router.use("/chat", require("./chat")(passport));
  return router;
};
