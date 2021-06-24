const { DBclient } = require("../connection");
exports.queryCommentC1 = async (comment) => {
  const querySpecForComment_User = {
    query: `SELECT * from c 
                WHERE c.spk = @spk`,
    parameters: [
      {
        name: "@spk",
        value: `user#${comment.author}#comment_id#${comment.comment_id}`,
      },
    ],
  };
  const { resources } = await DBclient.container.items
    .query(querySpecForComment_User)
    .fetchAll();

  // update the comment in container_2
  return resources[0];
};
