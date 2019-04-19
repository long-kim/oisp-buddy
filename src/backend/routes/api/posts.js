const router = require("express").Router();
const models = require("../../database/models/index");
const Post = models.Post;

module.exports = passport => {
  const PostService = require("../../services/PostService")(passport);
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
    PostService.editPost({ content: req.body.content }, req.params.postId).then(
      post => {
        res.json({ post_id: post.post_id, message: "Post edit successful" });
      }
    );
  });

  router.patch("/edit/:postId/score", (req, res, next) => {
    Post.findByPk(req.params.postId)
      .then(post => {
        return post.update({ score: req.body.score });
      })
      .then(post => {
        res.json({ post_id: post.post_id, message: "Post edit successful" });
      });
    // PostService.editPost({ score: req.body.score }, req.params.postId).then(
    //   post => {
    //     res.json({ post_id: post.post_id, message: "Post edit successful" });
    //   }
    // );
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
