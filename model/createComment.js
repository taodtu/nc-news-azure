const { DBclient } = require("../connection");
const { v4: uuidv4 } = require("uuid");

exports.createComment = async (comment) => {
  const comment_id = uuidv4();
  const created_at = new Date().toISOString();
  const spk = `${comment.author}#comment_id#${comment_id}`;
  const newComment = {
    ...comment,
    votes: 0,
    spk,
    comment_id,
    created_at,
  };
  const { resource } = await DBclient.container.items.create(newComment);

  return { ...newComment, id: resource.id };
};
