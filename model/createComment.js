const { DBclient } = require("../connection");
const { v4: uuidv4 } = require("uuid");
const { fetchAticleByID } = require("./fetchArticleByID");
const { updateArticle } = require("./updateArticle");

exports.createComment = async (comment) => {
  const comment_id = uuidv4();
  const newComment = {
    ...comment,
    article_id: +comment.article_id,
    votes: 0,
    spk: `user#${comment.author}#comment_id#${comment_id}`,
    comment_id,
    created_at: new Date().toISOString(),
  };
  const [{ resource }, res, article] = await Promise.all([
    DBclient.container.items.create(newComment),
    DBclient.container_2.items.create({
      ...newComment,
      spk: `article#${comment.article_id}#comment_id#${comment_id}`,
    }),
    fetchAticleByID(`article_id#${comment.article_id}`),
  ]);

  //update comment_count in articles in C1 and C2 container
  const article_update = {
    ...article,
    comment_count: article.comment_count + 1,
  };
  await updateArticle(article_update);

  return { ...newComment, id: resource.id };
};
