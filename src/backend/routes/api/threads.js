const router = require("express").Router();
const models = require("../../database/models/index");
const _ = require("lodash");
const Thread = models.Thread;
const Post = models.Post;
const Topic = models.Topic;
const ThreadVote = models.ThreadVoteModel;
const PAGE_LIMIT = 10;

module.exports = passport => {
  const ThreadService = require("../../services/ThreadService")(passport);
  router.get("/index", (req, res, next) => {
    if (!_.isEmpty(req.query)) {
      const topic = req.query.topic;
      let name;
      Topic.findByPk(topic)
        .then(topic => {
          name = topic.title;
          return topic.getThreads({
            order: [["createdAt", "DESC"]],
            include: [{ model: Topic }]
          });
        })
        .then(threads => {
          res.json({
            topic: name,
            threads: threads.map(thread => thread.toJSON())
          });
        });
    } else {
      Thread.findAll({
        order: [["createdAt", "DESC"]],
        include: [{ model: Topic }]
      }).then(thread => {
        res.json({ threads: thread.map(thread => thread.toJSON()) });
      });
    }
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

  router.get("/view/:threadId/posts", (req, res, next) => {
    const offset = (req.query.page - 1) * PAGE_LIMIT;
    ThreadService.getPosts(req.params.threadId, offset, PAGE_LIMIT)
      .then(posts => {
        res.json({ posts: posts.map(post => post.toJSON()) });
      })
      .catch(err => console.error(err));
  });

  router.get("/view/:threadId/posts/count", (req, res, next) => {
    Post.count({ where: { parent_id: req.params.threadId } }).then(count => {
      res.send({ count: count });
    });
  });

  router.post("/create", (req, res, next) => {
    Thread.create({ title: req.body.title, author_id: req.user.user_id })
      .then(thread => {
        let post_data = {
          posted_by: req.user.user_id,
          content: req.body.content,
          parent_id: thread.thread_id
        };
        return thread.createContent({
          content: post_data.content,
          posted_by: post_data.posted_by,
          parent_id: post_data.parent_id
        });
      })
      .then(post => {
        console.log("Thread created.");
        res.status(200).json({
          thread_id: post.parent_id,
          message: "Thread created."
        });
      })
      .catch(err => {
        console.error(err);
      });
  });

  router.get("/:threadId/subscribe", (req, res, next) => {
    Thread.findByPk(req.params.threadId).then(thread => {
      if (thread) {
        const user = req.user;
        thread.addSubscription(user).then(result => {
          res.json({
            result: result,
            message: "Subscribe Thread successful."
          });
        });
      }
    });
  });

  router.get("/:threadId/unsubscribe", (req, res, next) => {
    Thread.findByPk(req.params.threadId).then(thread => {
      if (thread) {
        const user = req.user;
        thread.removeSubscription(user).then(result => {
          res.json({
            result: result,
            message: "Unsubscribe Thread successful."
          });
        });
      }
    });
  });

  router.post("/:threadId/vote", (req, res, next) => {
    const user = req.user;
    Thread.findByPk(req.params.threadId).then(thread => {
      if (thread) {
        ThreadVote.findOrCreate({
          where: {
            user_id: user.user_id,
            thread_id: thread.thread_id
          }
        }).then(result => {
          user
            .addThreadVote(thread, { through: { voted: req.body.voted } })
            .then(vote => {
              res.send("Voted.");
            });
        });
      }
    });
  });

  router.patch("/:threadId/edit/score", (req, res, next) => {
    Thread.findByPk(req.params.threadId)
      .then(thread => {
        return thread.update({ score: req.body.score });
      })
      .then(thread => {
        return thread.getContent();
      })
      .then(post => {
        return post.update({ score: req.body.score });
      })
      .then(() => {
        res.send("Update score done.");
      })
      .catch(err => {
        console.error(err);
      });
  });

  return router;
};
