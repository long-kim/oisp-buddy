const router = require("express").Router();
const models = require("../../models/index");

const MSG_LIMIT = 10;

module.exports = passport => {
  const ChatService = require("../../services/ChatService")(passport);
  router.get("/", async (req, res, next) => {
    const currentUser = req.user;
    const data = await ChatService.getRooms(currentUser.user_id);
    res.send(data);
  })

  return router;
}