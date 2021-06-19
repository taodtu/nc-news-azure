const {
  topicData,
  commentData,
  userData,
  articleData,
} = require("../data/index");
const { DBclient } = require("../connection");

exports.seedTable = async () => {
  // seed the main container
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
    spk: `article_id#${article.article_id}`,
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
      const operations = commetnArray.map((comment) => ({
        operationType: "Create",
        resourceBody: comment,
      }));
      DBclient.container.items.bulk(operations);
    })
  );

  //seed the 2nd container
  await DBclient.container_2.delete();
  await DBclient.database.containers.create(
    {
      id: process.env.CONTAINER_2,
      partitionKey: process.env.PARTITION_KEY,
    },
    { offerThroughput: 2000 }
  );
  //seed the articles data with topics and users respectives as partition key
  const operations_2 = articleDataWithCount.reduce((opt, article) => {
    opt.push({
      operationType: "Create",
      resourceBody: {
        ...article,
        spk: `${article.topic}#topic_article#${article.article_id}`,
      },
    });
    opt.push({
      operationType: "Create",
      resourceBody: {
        ...article,
        spk: `${article.author}#author_article#${article.article_id}`,
      },
    });
    return opt;
  }, []);
  await DBclient.container_2.items.bulk(operations_2);
  //seed the comment data with article_id spk
  await Promise.all(
    commentInput.map((commetnArray) => {
      const operations = commetnArray.map((comment) => ({
        operationType: "Create",
        resourceBody: {
          ...comment,
          spk: `${comment.article_id}#comment_id#${comment.comment_id}`,
        },
      }));
      DBclient.container_2.items.bulk(operations);
    })
  );
  return;
};
