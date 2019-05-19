const models = require("backend/database/models");
const Thread = models.Thread;
const User = models.User;

module.exports = passport => {
  function getPosts(id, offset, limit) {
    return Thread.findByPk(id).then(thread => {
      return thread.getPosts({
        include: [{ model: User }],
        offset: offset,
        limit: limit
      });
    });
  }  

  function getAllThread(req) {
    const result = Thread.findAll()
      .then(info => {
        return Promise.resolve(info);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    return result;
  }

  return { 
    getPosts,
    getAllThread
  }

};
