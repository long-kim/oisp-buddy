const router = require("express").Router();
const models = require("../../database/models/index");
const User = models.User;
const jwt = require("jsonwebtoken");
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
    });
  });
  router.get("/view", (req, res, next) => {
    UserService.getUserInfo(req).then(result => {
      res.send(result);
    });
  });

  router.get("/viewfriend", (req, res, next) => {
    UserService.getFriendInfo(req).then(result => {
      res.send(result);
    });
  });

  router.get("/friendlist", (req, res, next) => {
    UserService.getFriendlist(req).then(result => {
      res.send(result);
    });
  });

  router.get("/friendstatus", (req, res, next) => {
    UserService.getFriendStatus(req).then(result => {
      res.send(result);
    });
  });

  router.get("/friendnoti", (req, res, next) => {
    UserService.getFriendNoti(req).then(result => {
      res.send(result);
    });
  });

  router.patch("/edit/friend", (req, res, next) => {
    UserService.editFriend(req).then(result => {
      res.send(result);
    });
  });

  router.post("/new/friend", (req, res, next) => {
    UserService.postFriend(req.body).then(result => {
      res.send(result);
    });
  });

  router.patch("/edit/about", (req, res, next) => {
    // console.log("print: " + req[0]);
    UserService.editUser_about(req.body).then(result => {
      res.send(result);
    });
  });

  router.patch("/edit/avatar", (req, res, next) => {
    // console.log("print: " + req[0]);
    UserService.editUser_avatar(req.body).then(result => {
      res.send(result);
    });
  });

  router.patch("/edit/cover", (req, res, next) => {
    // console.log("print: " + req[0]);
    UserService.editUser_cover(req.body).then(result => {
      res.send(result);
    });
  });

  router.patch("/edit/cover", (req, res, next) => {
    // console.log("print: " + req[0]);
    UserService.editUser_cover(req.body).then(result => {
      res.send(result);
    });
  });

  router.patch("/edit/name", (req, res, next) => {
    // console.log("print: " + req[0]);
    UserService.editUser_name(req.body).then(result => {
      res.send(result);
    });
  });

  router.patch("/edit/year", (req, res, next) => {
    // console.log("print: " + req[0]);
    UserService.editUser_year(req.body).then(result => {
      res.send(result);
    });
  });

  router.patch("/edit/dept", (req, res, next) => {
    // console.log("print: " + req[0]);
    UserService.editUser_dept(req.body).then(result => {
      res.send(result);
    });
  });

  router.get("/getAll", (req, res, next)=>{
    UserService.getAllUser(req.body).then(result => {
      res.send(result);
    })
  })

  // router.patch("/edit/dept", (req, res, next) => {
  //   // console.log("print: " + req[0]);
  //   UserService.editUser_dept(req.body).then(result => {
  //     res.send(result);
  //   });
  // });

  // router.patch("/edit/password", (req, res, next) => {
  //   // console.log("print: " + req[0]);
  //   UserService.editUser_password(req.body).then(result => {
  //     res.send(result);
  //   });
  // });

  return router;
};
