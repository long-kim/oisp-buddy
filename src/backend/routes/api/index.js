const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/threads", require("./threads"));
router.use("/posts", require("./posts"));

module.exports = router;
