const { DBclient } = require("../connection");
exports.queryArticleC2 = async (article) => {
  const querySpecForArticle_topic = {
    query: `SELECT * from c 
                WHERE c.spk = @spk`,
    parameters: [
      {
        name: "@spk",
        value: `${article.topic}#topic_article#${article.article_id}`,
      },
    ],
  };

  const querySpecForArticle_author = {
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
      DBclient.container_2.items.query(querySpecForArticle_topic).fetchAll(),
      DBclient.container_2.items.query(querySpecForArticle_author).fetchAll(),
    ]);
  return { article_topic: article_topic[0], article_author: article_author[0] };
};
