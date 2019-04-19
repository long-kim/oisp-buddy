const models = require("backend/database/models");
const Post = models.Post;

module.exports = passport => {
  function editPost(params, id) {
    Post.findByPk(id)
      .then(post => {
        return post.update(params);
      })
      .then(post => {
        return Promise.resolve(post);
      });
  }

  return { editPost };
};
