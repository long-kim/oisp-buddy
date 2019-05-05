const models = require("backend/database/models");
const Message = models.Message;

module.exports = passport => {
  function sendMsg(data) {
   
    return Message.create(data).then(mes => {
      return mes;
    });
  }

  function deleteMsg(id) {
    return Message.destroy({
      where: {
        msg_id: id
      }
    });
  }

  return { deleteMsg, sendMsg };
};
