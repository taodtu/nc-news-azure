const { DBclient } = require("../connection");
const { fetchAticleByID } = require("./fetchArticleByID");
const { queryCommentC1 } = require("./queryCommentC1");
const { queryCommentC2 } = require("./queryCommentC2");
const { updateArticle } = require("./updateArticle");

exports.deleteComment = async (comment) => {
  //needs to handle req from C1 or C2 respectively
  if (comment.spk.startsWith("user#")) {
    //query the comment in container_2 to delete and article in C1 to update
    const [comment_2, article] = await Promise.all([
      queryCommentC2(comment),
      fetchAticleByID(`article_id#${comment.article_id}`),
    ]);

    //update comment_count in articles in C1 and C2 container
    const article_update = {
      ...article,
      comment_count: article.comment_count - 1,
    };
    // delete two comments and update comment_count of 3 articles
    await Promise.all([
      DBclient.container.item(comment.id, comment.spk).delete(),
      DBclient.container_2.item(comment_2.id, comment_2.spk).delete(),
      updateArticle(article_update),
    ]);
  } else {
    //query the comment in container_1 to delete and article in C2 to update
    const [comment_1, article] = await Promise.all([
      queryCommentC1(comment),
      fetchAticleByID(`article_id#${comment.article_id}`),
    ]);

    //update comment_count in articles in C1 and C2 container
    const article_update = {
      ...article,
      comment_count: article.comment_count - 1,
    };

    // delete two comments and update comment_count of 3 articles
    await Promise.all([
      DBclient.container_2.item(comment.id, comment.spk).delete(),
      DBclient.container.item(comment_1.id, comment_1.spk).delete(),
      updateArticle(article_update),
    ]);
  }

  return "delete comment successful";
};
