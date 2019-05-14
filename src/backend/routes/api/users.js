const router = require("express").Router();
const models = require("../../database/models/index");
const User = models.User;
const sequelize = require("sequelize");

module.exports = passport => {
  const UserService = require("../../services/UserService")(passport);
  router.get("/", (req, res, next) => {
    User.findAll({
      order: [["user_id", "ASC"]]
    }).then(users => {
      res.json({ users: users.map(user => user.toJSON()) });
    });
  });

  // router.get("/user_data", function(req, res) {
  //   if (req.user === undefined) {
  //     // The user is not logged in
  //     res.json({});
  //   } else {
  //     console.log(req.user);
  //     res.json({
  //       username: req.user
  //     });
  //   }
  // });
  router.post("/find", (req, res, next) => {
    // console.log(req.body.content);
    let lookupValue = req.body.content.toLowerCase();

    User.findAll({
      limit: 5,
      attributes: ["username", "avatar", "first_name", "user_id"],
      where: {
        username: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("username")),
          "LIKE",
          "%" + lookupValue + "%"
        )
      }
    })
      .then(function(users) {
        return res.json({
          msg: "search results",
          users: users
        });
      })
      .catch(function(error) {
        console.log(error);
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

  return router;
};
