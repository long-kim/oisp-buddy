const router = require("express").Router();
const models = require("../../database/models/index");
const Post = models.Post;

module.exports = passport => {
  router.post("/new", (req, res, next) => {
    Post.create({
      content: req.body.content,
      parent_id: req.body.thread_id,
      posted_by: req.user.user_id
    })
      .then(post => {
        console.log("Post created.");
        res.status(200).json({
          post_id: post.post_id,
          message: "Post created."
        });
      })
      .catch(err => {
        console.error(err);
      });
  });

  router.patch("/edit/:postId", (req, res, next) => {
    console.log(req.body);
    Post.update(
      {
        content: req.body.content
      },
      {
        where: {
          post_id: req.params.postId
        }
      }
    ).then(post => {
      res.json({ post_id: post.post_id, message: "Post edit successful" });
    });
  });

  router.delete("/delete/:postId", (req, res, next) => {
    Post.destroy({
      where: {
        post_id: req.params.postId
      }
    }).then(post => {
      console.log(post);
      res.json({
        post_id: post.post_id,
        message: "Post deleted."
      });
    });
  });

  return router;
};
