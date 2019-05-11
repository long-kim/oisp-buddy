const router = require("express").Router();
const sequelize = require("sequelize");
const models = require("../../database/models/index");
const _ = require("lodash");
const Thread = models.Thread;
const Post = models.Post;
const Topic = models.Topic;
const User = models.User;
const ThreadVote = models.ThreadVoteModel;
const Subscriptions = models.SubscriptionModel;
const PAGE_LIMIT = 10;

module.exports = passport => {
  const ThreadService = require("../../services/ThreadService")(passport);
  router.get("/index", async (req, res, next) => {
    const user = req.user;
    console.log(user);
    const response = [];
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
      const threads = await Thread.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          { model: Topic, as: "topics" },
          { model: User },
          {
            model: Post,
            order: [["createdAt", "DESC"]],
            include: [{ model: User }]
          },
          {
            model: User,
            as: "Subscription"
          }
        ]
      });
      for (let thread of threads) {
        const temp = thread.toJSON();
        const latest_post = _.last(temp.Posts);
        const subscriptions = temp.Subscription;
        const logged_in = req.user.user_id;
        const isSubbed =
          _.find(subscriptions, ["user_id", logged_in]) !== undefined;
        const data = {
          thread_id: temp.thread_id,
          title: temp.title,
          author: {
            id: temp.author_id,
            name: _.join([temp.User.first_name, temp.User.last_name], " ")
          },
          posts_count: _.size(temp.Posts),
          last_reply: {
            posted_by: latest_post.posted_by,
            name: _.join(
              [latest_post.User.first_name, latest_post.User.last_name],
              " "
            ),
            at: latest_post.updatedAt
          },
          sub: isSubbed
        };
        response.push(data);
      }
      res.send(response);
    }
  });

  router.get("/view/:threadId", async (req, res, next) => {
    const page = !_.isUndefined(req.query.page) ? req.query.page : 1;
    const offset = (page - 1) * PAGE_LIMIT;
    const response = await ThreadService.getPosts(
      req.params.threadId,
      offset,
      PAGE_LIMIT,
      req.user.user_id
    );
    res.send(response);
  });

  // router.get("/view/:threadId/posts", async (req, res, next) => {
  //   const page = req.query.page - 1 || 1;
  //   const offset = page * PAGE_LIMIT;
  //   ThreadService.getPosts(req.params.threadId, offset, PAGE_LIMIT)
  //     .then(posts => {
  //       res.json({ posts: posts.map(post => post.toJSON()) });
  //     })
  //     .catch(err => console.error(err));
  // });

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
