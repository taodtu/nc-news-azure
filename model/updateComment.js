const { DBclient } = require("../connection");

exports.updateComment = async (comment) => {
  await DBclient.container.item(comment.id, comment.spk).replace(comment);

  return "update comment successful";
};
