const { DBclient } = require("../connection");

exports.fetchAticles = async ({
  sort_by = "created_at",
  order = "desc",
  author,
  topic,
  limit = 100,
  p = 1,
}) => {
  const offset = limit * (p - 1);
  let spk;
  if (!author && !topic) {
    spk = "article_id#";
  } else {
    spk = author ? `${author}#author_article#` : `${topic}#topic_article#`;
  }
  const querySpec = {
    query: `SELECT * from c 
            WHERE STARTSWITH(c.spk, @spk)
            ORDER BY c[@sort_by] ${order}
            OFFSET ${offset} LIMIT ${limit}`,
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

  // read all items in the Items container
  const { resources } =
    spk === "article_id#"
      ? await DBclient.container.items.query(querySpec).fetchAll()
      : await DBclient.container_2.items.query(querySpec).fetchAll();

  return resources.map(
    ({
      topic,
      title,
      author,
      created_at,
      votes,
      article_id,
      comment_count,
      id,
    }) => ({
      topic,
      title,
      author,
      created_at,
      votes,
      article_id,
      comment_count,
      id,
    })
  );
};
