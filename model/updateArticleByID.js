const { DBclient } = require("../connection");

exports.updateArticleByID = async (article) => {
  const { resource } = await DBclient.container.items.upsert(article);
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
