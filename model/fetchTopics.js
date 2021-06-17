const { DBclient } = require("../connection");

exports.fetchTopics = async () => {
  const querySpec = {
    query: "SELECT * from c WHERE c.spk = @spk",
    parameters: [
      {
        name: "@spk",
        value: "topic",
      },
    ],
  };

  // read all items in the Items container
  const { resources } = await DBclient.container.items
    .query(querySpec)
    .fetchAll();

  return resources.map(({ slug, description }) => ({ slug, description }));
};
