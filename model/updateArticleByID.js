const { DBclient } = require("../connection");

exports.updateArticleByID = async (article) => {
  //query the two article items in container_2 to update later
  const querySpecForarticle_topic = {
    query: `SELECT * from c 
            WHERE c.spk = @spk`,
    parameters: [
      {
        name: "@spk",
        value: `${article.topic}#topic_article#${article.article_id}`,
      },
    ],
  };

  const querySpecForarticle_author = {
    query: `SELECT * from c 
            WHERE c.spk = @spk`,
    parameters: [
      {
        name: "@spk",
        value: `${article.author}#author_article#${article.article_id}`,
      },
    ],
  };

  // read the two items from container_2
  const [{ resources: article_topic }, { resources: article_author }] =
    await Promise.all([
      DBclient.container_2.items.query(querySpecForarticle_topic).fetchAll(),
      DBclient.container_2.items.query(querySpecForarticle_author).fetchAll(),
    ]);

  // update the two articles in container_2
  const article_topic_update = { ...article_topic[0], votes: article.votes };
  const article_author_update = { ...article_author[0], votes: article.votes };

  //update the three article records together
  const [{ resource }, res1, res2] = await Promise.all([
    DBclient.container.item(article.id, article.spk).replace(article),
    DBclient.container_2
      .item(article_topic[0].id, article_topic[0].spk)
      .replace(article_topic_update),
    DBclient.container_2
      .item(article_author[0].id, article_author[0].spk)
      .replace(article_author_update),
  ]);
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
  } = resource;

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
  };
};
