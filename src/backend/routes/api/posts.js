const router = require("express").Router();
const models = require("../../database/models/index");
const Post = models.Post;

module.exports = passport => {
  const PostService = require("../../services/PostService")(passport);
  router.post("/new", (req, res, next) => {
    const data = {
      content: req.body.content,
      parent_id: req.body.thread_id,
      posted_by: req.user.user_id
    };
    PostService.addPost(data)
      .then(post => {
        res.json({
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
    PostService.editPost({ score: req.body.score }, req.params.postId).then(
      post => {
        res.json({ post_id: post.post_id, message: "Post edit successful" });
      }
    );
  });

  router.delete("/delete/:postId", (req, res, next) => {
    PostService.deletePost(req.params.postId)
      .then(post => {
        res.json({
          post_id: post.post_id,
          message: "Post deleted."
        });
      })
      .catch(err => {
        console.error(err);
      });
  });

  router.post("/:postId/vote", (req, res, next) => {
    const user = req.user;
    Post.findByPk(req.params.postId).then(post => {
      if (post) {
        user
          .addPostVote(post, { through: { voted: req.body.voted } })
          .then(vote => {
            res.send("Voted");
          });
      }
    });
  });

  return router;
};
