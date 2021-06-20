const { DBclient } = require("../connection");
exports.QueryCommentC2 = async (comment) => {
  const querySpecForComment_Article = {
    query: `SELECT * from c 
                WHERE c.spk = @spk`,
    parameters: [
      {
        name: "@spk",
        value: `${comment.article_id}#comment_id#${comment.comment_id}`,
      },
    ],
  };
  const { resources } = await DBclient.container_2.items
    .query(querySpecForComment_Article)
    .fetchAll();

  // update the comment in container_2
  return resources[0];
};
