const router = require("express").Router();
const models = require("../../database/models/index");
const Post = models.Post;

module.exports = passport => {
  router.get("/:postId", (req, res, next) => {
    Post.findByPk(req.params.postId)
      .then(post => {
        return post.getUser();
      })
      .then(user => {
        const data = {
          name: [user.first_name, user.last_name].join(" "),
          username: user.username
        };
        res.json(data);
      })
      .catch(err => console.error(err));
  });

  router.post("/new", (req, res, next) => {
    Post.create(
      {
        content: req.body.content,
        parent_id: req.body.thread_id,
        posted_by: req.user.user_id
      }
    ).then(post => {
      console.log("Post created.");
      res.status(200).json({
        post_id: post.post_id,
        message: "Post created."
      })
    }).catch(err => {
      console.error(err);
    })
  })

  return router;
};
