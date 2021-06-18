const { DBclient } = require("../connection");

exports.fetchComments = async (
  { username, article_id },
  { sort_by = "created_at", order = "desc" }
) => {
  let result;
  // read all items in the Items container
  if (username) {
    const querySpec = {
      query: `SELECT * from c 
                WHERE STARTSWITH(c.spk, @spk)
                ORDER BY c[@sort_by] ${order}`,
      parameters: [
        {
          name: "@spk",
          value: `${username}#`,
        },
        {
          name: "@sort_by",
          value: sort_by,
        },
      ],
    };
    result = await DBclient.container.items.query(querySpec).fetchAll();
  } else if (article_id) {
  }

  return result.resources.map(
    ({ author, created_at, votes, article_id, body, comment_id }) => ({
      author,
      created_at,
      votes,
      article_id,
      body,
      comment_id,
    })
  );
};
