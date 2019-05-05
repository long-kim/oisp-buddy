const router = require("express").Router();

module.exports = passport => {
<<<<<<< HEAD
  router.use("/users", require("./users")(passport));// router.use("/users", require("./users"));
=======
  router.use("/users", require("./users")(passport));
>>>>>>> ae2d4070bd7864fe18df33c3ac7a275787714e27
  router.use("/threads", require("./threads")(passport));
  router.use("/posts", require("./posts")(passport));
  router.use("/topics", require("./topics")(passport));
  return router;
};
