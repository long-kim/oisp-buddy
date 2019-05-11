const models = require("backend/database/models");
const Thread = models.Thread;
const User = models.User;
const Post = models.Post;
const _ = require("lodash");

module.exports = passport => {
  async function getPosts(id, offset, limit, user_id) {
    const thread = await Thread.findByPk(id, {
      include: [
        {
          model: User,
          as: "Subscription"
        }
      ]
    });
    const posts_count = await Post.count({ where: { parent_id: id } });
    const posts = await thread.getPosts({
      include: [{ model: User }],
      offset: offset,
      limit: limit
    });
    const thread_obj = thread.toJSON();
    const posts_data = posts.map(post => {
      const post_obj = post.toJSON();
      const data = {
        post_id: post_obj.post_id,
        content: post_obj.content,
        score: post_obj.score,
        timestamp: post_obj.updatedAt,
        parent_id: post_obj.content_of,
        posted_by: {
          user_id: post_obj.User.user_id,
          name: `${post_obj.User.first_name} ${post_obj.User.last_name}`,
          avatar: post_obj.User.avatar
        }
      };
      return data;
    });
    const data = {
      thread_id: thread_obj.thread_id,
      title: thread_obj.title,
      score: thread_obj.score,
      isSubbed:
        _.find(thread_obj.Subscription, ["user_id", user_id]) !==
        undefined,
      posts_count: posts_count,
      posts: posts_data
    };
    return data;
  }

  return { getPosts };
};
