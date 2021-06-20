const { DBclient } = require("../connection");

exports.fetchAticleByID = async (spk) => {
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

  const {
    topic,
    title,
    author,
    created_at,
    votes,
    article_id,
    body,
    comment_count,
    id,
  } = resources[0];
  return {
    topic,
    title,
    author,
    created_at,
    votes,
    article_id,
    body,
    comment_count,
    id,
    spk,
  };
};
