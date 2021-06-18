const { DBclient } = require("../connection");

exports.deleteComment = async ({ id, spk }) => {
  await DBclient.container.item(id, spk).delete();

  return "delete comment successful";
};
