const { DBclient } = require("../connection");
const { QueryCommentC2 } = require("./queryCommentC2");

exports.updateComment = async (comment) => {
  //query the comment in container_2 to update later
  const result = await QueryCommentC2(comment);
  const comment_Article_update = { ...result, votes: comment.votes };

  await Promise.all([
    DBclient.container.item(comment.id, comment.spk).replace(comment),
    DBclient.container_2
      .item(comment_Article_update.id, comment_Article_update.spk)
      .replace(comment_Article_update),
  ]);

  return "update comment successful";
};
