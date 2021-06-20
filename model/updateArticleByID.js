const { DBclient } = require("../connection");
const { queryArticleC2 } = require("./queryArticleC2");

exports.updateArticleByID = async (article) => {
  //query the two article items in container_2 to update later
  const { article_topic, article_author } = await queryArticleC2(article);

  // update the two articles in container_2
  const article_topic_update = { ...article_topic, votes: article.votes };
  const article_author_update = { ...article_author, votes: article.votes };

  //update the three article records together
  await Promise.all([
    DBclient.container.item(article.id, article.spk).replace(article),
    DBclient.container_2
      .item(article_topic.id, article_topic.spk)
      .replace(article_topic_update),
    DBclient.container_2
      .item(article_author.id, article_author.spk)
      .replace(article_author_update),
  ]);
  return "update article successful";
  // const {
  //   topic,
  //   title,
  //   author,
  //   created_at,
  //   votes,
  //   article_id,
  //   body,
  //   comment_count,
  //   id,
  // } = resource;

  // return {
  //   topic,
  //   title,
  //   author,
  //   created_at,
  //   votes,
  //   article_id,
  //   body,
  //   comment_count,
  //   id,
  // };
};
