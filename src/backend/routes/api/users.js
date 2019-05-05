const router = require("express").Router();
const models = require("../../database/models/index");
const User = models.User;
<<<<<<< HEAD
const jwt = require("jsonwebtoken");
/*router.get("/", (req, res, next) => {
  const User = models.User
  User.findAll({
    order: [["user_id", "ASC"]]
  }).then(users => {
    res.json({ users: users.map(user => users.toJSON()) });
    res.json(users.toJSON());
  });
});
module.exports = router;*/


module.exports = passport => {
  router.get("/", (req, res, next) => {
    Thread.findAll({
      order: [["user_id", "ASC"]]
    }).then(users => {
      res.json({ users: users.map(user => users.toJSON()) });
    });
  });
  router.get(
    "/view/:userId",

    (req, res, next) => {
      let id=jwt.decode(req.params.userId).id;
      User.findByPk(id)
        .then(user => {
          res.json(user.toJSON());
          //console.log(user);
        })
        .catch(err => console.error(err));
    }
  );
  return router;
}
=======

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

  return router;
};
>>>>>>> ae2d4070bd7864fe18df33c3ac7a275787714e27
