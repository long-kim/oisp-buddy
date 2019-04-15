const router = require("express").Router();
const models = require("../../database/models/index");
const Thread = models.Thread;
const Post = models.Post;
const User = models.User;

module.exports = passport => {
  router.get("/index", (req, res, next) => {
    Thread.findAll({
      order: [["createdAt", "DESC"]]
    }).then(thread => {
      res.json({ threads: thread.map(thread => thread.toJSON()) });
    });
  });

  router.get(
    "/view/:threadId",

    (req, res, next) => {
      Thread.findByPk(req.params.threadId)
        .then(thread => {
          res.json(thread.toJSON());
        })
        .catch(err => console.error(err));
    }
  );

  router.get(
    "/view/:threadId/posts",

    (req, res, next) => {
      Thread.findByPk(req.params.threadId)
        .then(thread => {
          return thread.getPosts({ include: [{ model: User }] });
        })
        .then(posts => {
          res.json({ posts: posts.map(post => post.toJSON()) });
        })
        .catch(err => console.error(err));
    }
  );

  router.post("/create", (req, res, next) => {
    Thread.create({ title: req.body.title, author_id: req.user.user_id })
      .then(thread => {
        let post = {
          posted_by: req.user.user_id,
          content: req.body.content,
          parent_id: thread.thread_id
        };
        return post;
      })
      .then(post_data => {
        Post.create({
          content: post_data.content,
          posted_by: post_data.posted_by,
          parent_id: post_data.parent_id
        }).then(post => {
          console.log("Thread created.");
          res.status(200).json({
            thread_id: post.parent_id,
            message: "Thread created."
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  });

  return router;
};
