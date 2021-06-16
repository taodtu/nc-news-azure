const { topicData, commentData } = require("../data/index");
const { DBclient } = require("../connection");

exports.seedTable = async () => {
  // await DBclient.container.delete();
  // await DBclient.database.containers.create(
  //   {
  //     id: process.env.CONTAINER_PRIMARY,
  //     partitionKey: process.env.PARTITION_KEY,
  //   },
  //   { offerThroughput: 400 }
  // );
  // await Promise.all(
  //   topicData.map((topic) => DBclient.container.items.create(topic))
  // );
  console.log(commentData[0]);
  return;
};
