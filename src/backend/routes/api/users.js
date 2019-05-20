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
    })
  })
  router.get("/view", (req, res, next) => {
    UserService.getUserInfo(req).then(result => {
      res.send(result);
    });
  });

  router.get("/edit/dept", (req, res, next) => {
    UserService.editUser_dept(req.body).then(result => {
      res.send(result);
    });
  });

  router.get("/getAllMember", (req, res, next) => {
    UserService.getAllUser(req).then(result => {
      res.send(result);
    });
  });

  router.get("/memberlist", (req, res, next) => {
    UserService.getAllUser(req).then(result => {
      res.send(result);
    });
  });

  return router;
};
