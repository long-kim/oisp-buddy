const models = require("backend/database/models");
const Thread = models.Thread;
const User = models.User;

module.exports = passport => {
  async function getPosts(id, offset, limit) {
    const thread = await Thread.findByPk(id);
    return await thread.getPosts({
      include: [{ model: User }],
      offset: offset,
      limit: limit
    });
  }

  return { getPosts };
};
