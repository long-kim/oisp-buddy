const router = require("express").Router();
const models = require("../../database/models/index");
const Post = models.Post;

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

module.exports = router;
