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
    { offerThroughput: 2000 }
  );

  const comment_count_chart = commentData.reduce((chart, comment) => {
    chart[comment.article_id] = (chart[comment.article_id] || 0) + 1;
    return chart;
  }, {});
  const articleDataWithCount = articleData.map((article) => ({
    comment_count: comment_count_chart[article.article_id],
    ...article,
  }));

  //seed topics, users and articles data
  const operations = [...topicData, ...articleDataWithCount, ...userData].map(
    (item) => ({
      operationType: "Create",
      resourceBody: item,
    })
  );
  await DBclient.container.items.bulk(operations);

  //batchWriteItem can wirte max 100 request so this array is divided
  const commentInput = commentData.reduce(
    (a, comment, index) => {
      a[Math.floor(index / 100)].push(comment);
      return a;
    },

    [...Array(Math.ceil(commentData.length / 100))].map((e) => [])
  );
  await Promise.all(
    commentInput.map((commetnArray) => {
      const operations = commetnArray.map((item) => ({
        operationType: "Create",
        resourceBody: item,
      }));
      DBclient.container.items.bulk(operations);
    })
  );
  return;
};
