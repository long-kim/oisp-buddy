const router = require("express").Router();
const moment = require("moment");

router.get("/", (req, res) => {
  res.json("Hello Chat API");
});

module.exports = router;
