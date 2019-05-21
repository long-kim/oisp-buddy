const models = require("backend/database/models");
const Post = models.Post;

module.exports = passport => {
  function addPost(data) {
    return Post.create(data).then(post => {
      return post;
    });
  }

  function editPost(params, id) {
    return Post.findByPk(id)
      .then(post => {
        return post.update(params);
      })
      .then(post => {
        return post;
      });
  }

  function deletePost(id) {
    return Post.destroy({
      where: {
        post_id: id
      }
    });
  }

  function getAllPost(req) {
    const result = Post.findAll()
      .then(info => {
        return Promise.resolve(info);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    return result;
  }

  // function getAllTopic(req) {
  //   const result = Post.findAll()
  //     .then(info => {
  //       return Promise.resolve(info);
  //     })
  //     .catch(err => {
  //       return Promise.reject(err);
  //     });
  //   return result;
  // }

  return { addPost, editPost, deletePost, getAllPost };
};
