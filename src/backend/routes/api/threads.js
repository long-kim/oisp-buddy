const router = require("express").Router();
const models = require("../../database/models/index");
const Thread = models.Thread;

router.get("/index", (req, res, next) => {
  Thread.findAll({
    order: [["thread_id", "ASC"]]
  }).then(thread => {
    res.json({ threads: thread.map(thread => thread.toJSON()) });
  });
});

router.get("/view/:threadId", (req, res, next) => {
  Thread.findByPk(req.params.threadId)
    .then(thread => {
      res.json(thread.toJSON());
    })
    .catch(err => console.error(err));
});

router.get("/view/:threadId/posts", (req, res, next) => {
  Thread.findByPk(req.params.threadId)
    .then(thread => {
      return thread.getPosts();
    })
    .then(posts => {
      res.json({ posts: posts.map(post => post.toJSON()) });
    })
    .catch(err => console.error(err));
});

router.post("/create", (req, res, next) => {
  console.log(req.body);
  Thread.create({ title: req.body.title, author_id: req.body.author }).then(
    thread => {
      res.json({
        status: true,
        thread_id: thread.thread_id
      });
    }
  );
});

module.exports = router;
