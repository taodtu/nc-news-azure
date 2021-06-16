const {
  topicData,
  commentData,
  userData,
  articleData,
} = require("../data/index");
const { DBclient } = require("../connection");

exports.seedTable = async () => {
  await DBclient.container.delete();
  await DBclient.database.containers.create(
    {
      id: process.env.CONTAINER_PRIMARY,
      partitionKey: process.env.PARTITION_KEY,
    },
    { offerThroughput: 400 }
  );

  const comment_count_chart = commentData.reduce((chart, comment) => {
    chart[comment.article_id] = (chart[comment.article_id] || 0) + 1;
    return chart;
  }, {});
  const articleDataWithCount = articleData.map((article) => ({
    comment_count: comment_count_chart[article.article_id],
    ...article,
  }));
  const operations = topicData.map((topic) => ({
    operationType: "Create",
    resourceBody: topic,
  }));
  await DBclient.container.items.bulk(operations);
  return;
};
