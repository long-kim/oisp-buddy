const router = require("express").Router();
const models = require("../../models/index");
const User = models.User;

module.exports = passport => {
  const UserService = require("../../services/UserService")(passport);
  router.get("/", (req, res, next) => {
    User.findAll({
      order: [["user_id", "ASC"]]
    }).then(users => {
      res.json({ users: users.map(user => user.toJSON()) });
    });
  });

  router.post("/edit/friend", async (req, res, next) => {
    const currentUser = req.user;
    const { status, user1, user2 } = req.body;
    const result = await UserService.editFriendStatus(
      user1,
      user2,
      status,
      currentUser.user_id
    );
    res.send(result);
  });

  router.get("/view/:userId", async (req, res, next) => {
    const currentUser = req.user.toJSON();
    const user_id = req.params.userId;
    const data = await UserService.getInfo(user_id, currentUser.user_id);
    res.send(data);
  });

  router.get("/requests", async (req, res, next) => {
    try {
      const currentUser = req.user.toJSON();
      const data = await UserService.getFriendRequests(currentUser.user_id);
      res.send(data);
    } catch {
      res.sendStatus(403);
    }
  });

  router.patch("/edit/:userId", async (req, res, next) => {
    const user_id = req.params.userId;
    try {
      await UserService.edit(user_id, req.body);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });

  router.get("/getAllMember", (req, res, next) => {
    UserService.getAllUser(req).then(result => {
      res.send(result);
    });
  });

  router.get("/subscriptions", (req, res, next) => {
    UserService.getSubscription(req).then(result => {
      res.send(result);
    });
  });

  router.get("/votes/thread", (req, res, next) => {
    UserService.getThreadVotes(req).then(result => {
      res.send(
        result.map(vote => ({ thread_id: vote.thread_id, voted: vote.voted }))
      );
    });
  });

  router.get("/votes/post", (req, res, next) => {
    UserService.getPostVotes(req).then(result => {
      res.send(
        result.map(vote => ({ post_id: vote.post_id, voted: vote.voted }))
      );
    });
  });

  router.get("/memberlist", (req, res, next) => {
    UserService.getAllUser(req).then(result => {
      res.send(result);
    });
  });

  return router;
};
