const router = require("express").Router();
const models = require("../../database/models/index");
const Topic = models.Topic;
const Op = require("sequelize").Op;

module.exports = passport => {
  router.get("/find", (req, res, next) => {
    const query = req.query.input;
    Topic.findAll({
      where: {
        title: {
          [Op.like]: `%${query}%`
        }
      }
    }).then(results => {
      res.send(results);
    });
  });

  // router.get("/getAllTopic", (req, res, next) => {
  //   PostService.getAllTopic(req).then(result => {
  //     res.send(result);
  //   });
  // });

  return router;
};
