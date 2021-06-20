const { DBclient } = require("../connection");
const { v4: uuidv4 } = require("uuid");

exports.createComment = async (comment) => {
  const comment_id = uuidv4();
  const newComment = {
    ...comment,
    votes: 0,
    spk: `${comment.author}#comment_id#${comment_id}`,
    comment_id,
    created_at: new Date().toISOString(),
  };
  const [{ resource }, res] = await Promise.all([
    DBclient.container.items.create(newComment),
    DBclient.container_2.items.create({
      ...newComment,
      spk: `${comment.article_id}#comment_id#${comment_id}`,
    }),
  ]);

  return { ...newComment, id: resource.id };
};
