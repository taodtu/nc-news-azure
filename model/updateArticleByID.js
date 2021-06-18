const { DBclient } = require("../connection");

exports.updateArticleByID = async (spk, { inc_votes }) => {
  const querySpec = {
    query: `SELECT * from c 
            WHERE c.spk = @spk`,
    parameters: [
      {
        name: "@spk",
        value: spk,
      },
    ],
  };

  // read all items in the Items container
  const { resources } = await DBclient.container.items
    .query(querySpec)
    .fetchAll();
  const article = resources[0];
  const { id, votes } = article;
  const articleToUpdate = { ...article, votes: votes + inc_votes };

  const { resource: updatedItem } = await DBclient.container
    .item(id, spk)
    .replace(articleToUpdate);
  const { topic, title, author, created_at, article_id, body, comment_count } =
    updatedItem;

  return {
    topic,
    title,
    author,
    created_at,
    votes: votes + inc_votes,
    article_id,
    body,
    comment_count,
  };
};
