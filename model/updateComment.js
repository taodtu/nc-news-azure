const { DBclient } = require("../connection");
const { queryCommentC2 } = require("./queryCommentC2");
const { queryCommentC1 } = require("./queryCommentC1");

exports.updateComment = async (comment) => {
  //need to distinguish the comment originally come from C1 or C2
  if (comment.spk.startsWith("user#")) {
    //query the comment in container_2 to update later
    const result = await queryCommentC2(comment);
    const comment_Article_update = { ...result, votes: comment.votes };

    await Promise.all([
      DBclient.container.item(comment.id, comment.spk).replace(comment),
      DBclient.container_2
        .item(comment_Article_update.id, comment_Article_update.spk)
        .replace(comment_Article_update),
    ]);
  } else {
    //query the comment in container_1 to update later
    const result = await queryCommentC1(comment);
    const comment_User_update = { ...result, votes: comment.votes };

    await Promise.all([
      DBclient.container_2.item(comment.id, comment.spk).replace(comment),
      DBclient.container
        .item(comment_User_update.id, comment_User_update.spk)
        .replace(comment_User_update),
    ]);
  }

  return "update comment successful";
};
