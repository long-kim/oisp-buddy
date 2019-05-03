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
    RoomService.getMessages(req.params, MESS_LIMIT).then(result => {
      res.send(result);
    });
  });

  router.get("/:room_id/last", (req, res, next) => {
    RoomService.getLastMessages(req.params).then(result => {
      res.send(result);
    });
  });

  // router.get("/subscriptions", (req, res, next) => {
  //   UserService.getSubscription(req).then(result => {
  //     res.send(result);
  //   });
  // });

  return router;
};
