const router = require("express").Router();

module.exports = passport => {
  const RoomService = require("../../services/RoomService")(passport);
  const UserService = require("../../services/UserService")(passport);

  router.get("/", (req, res, next) => {
    UserService.getRoomList(req).then(async result => {
      let newarr = [];
      for await (let i of result) {
        newarr.push(i.dataValues);
      }
      res.send(newarr);
    });
  });

  router.get("/active", (req, res, next) => {
    const result = UserService.getActiveUser(req);
    res.send(result.toString());
  });

  router.post("/find", (req, res, next) => {
    RoomService.findRoom(req.body).then(result => {
      res.send(result);
    });
  });

  router.post("/newRoom", (req, res, next) => {
    RoomService.newRoom(req.body).then(result => {
      res.send(result);
    });
  });

  router.get("/:room_id/info", (req, res, next) => {
    RoomService.getRoom(req.params).then(result => {
      res.send(result);
    });
  });

  router.get("/:room_id/fullinfo", (req, res, next) => {
    RoomService.getRoomFull(req.params).then(result => {
      res.send(result);
    });
  });

  return router;
};
