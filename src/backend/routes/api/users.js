const router = require("express").Router();
const models = require("../../database/models/index");
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

  router.get("/subscriptions", (req, res, next) => {
    UserService.getSubscription(req).then(result => {
      res.send(result);
    });
  });

  router.get("/votes/thread", (req, res, next) => {
    UserService.getVotes(req, "thread").then(result => {
      res.send(
        result.map(vote => ({ thread_id: vote.thread_id, voted: vote.voted }))
      );
    });
  });

  return router;
};
