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

  function getThreadList(req) {
    const user = req.query.user ? req.query.user : 1;
    // console.log("this is request:", req.user ? req.user.user_id : 1);
    console.log("user need thead: ", user);
    const result = Thread.findAll({
      where: {
        author_id: user
      }
    })
      .then(thread => {
        // console.log("relationship", Promise.resolve(relationship));
        return Promise.resolve(thread);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    return result;
  }

  return { getPosts, getThreadList };
};
