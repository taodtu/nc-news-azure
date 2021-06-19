const { DBclient } = require("../connection");

exports.fetchComments = async (
  { username, article_id },
  { sort_by = "created_at", order = "desc" }
) => {
  let result;
  const spk = username ? `${username}#comment_id` : `${article_id}#comment_id`;
  const querySpec = {
    query: `SELECT * from c 
              WHERE STARTSWITH(c.spk, @spk)
              ORDER BY c[@sort_by] ${order}`,
    parameters: [
      {
        name: "@spk",
        value: spk,
      },
      {
        name: "@sort_by",
        value: sort_by,
      },
    ],
  };
  if (username) {
    result = await DBclient.container.items.query(querySpec).fetchAll();
  } else if (article_id) {
    result = await DBclient.container_2.items.query(querySpec).fetchAll();
  }

  return result.resources.map(
    ({ author, created_at, votes, article_id, body, comment_id, id }) => ({
      author,
      created_at,
      votes,
      article_id,
      body,
      comment_id,
      id,
    })
  );
};
