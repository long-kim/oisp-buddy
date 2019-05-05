const router = require("express").Router();
const models = require("../../database/models/index");

// const UserRooms = models.user_rooms;
const MESS_LIMIT = 10;

module.exports = passport => {
  const RoomService = require("../../services/RoomService")(passport);
  const MessageService = require("../../services/MessageService")(passport);
  const UserService = require("../../services/UserService")(passport);

  router.get("/", (req, res, next) => {
    UserService.getRooms(req).then(result => {
      res.send(result);
    });
  });

  router.get("/:room_id", (req, res, next) => {
    const offset = (req.query.page - 1) * MESS_LIMIT;
    RoomService.getMessages(req.params, offset, MESS_LIMIT).then(result => {
      res.send(result);
    });
  });

  router.get("/:room_id/info", (req, res, next) => {
    RoomService.getRoom(req.params).then(result => {
      res.send(result);
    });
  });

  router.get("/:room_id/last", (req, res, next) => {
    RoomService.getLastMessages(req.params).then(result => {
      res.send(result);
    });
  });

  router.post("/:room_id/new", (req, res, next) => {
    const user_id = req.user ? req.user.user_id : 2;
    console.log(req.body);
    const data = {
      content: req.body.content,
      sender_id: user_id,
      room_id: req.params.room_id
    };
    MessageService.sendMsg(data)
      .then(mess => {
        res.json({
          msg_id: mess.msg_id,
          message: "Sent!"
        });
      })
      .catch(err => {
        console.error(err);
      });
  });

  // router.get("/subscriptions", (req, res, next) => {
  //   UserService.getSubscription(req).then(result => {
  //     res.send(result);
  //   });
  // });

  return router;
};
