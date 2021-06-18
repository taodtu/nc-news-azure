const { DBclient } = require("../connection");

exports.fetchUser = async (spk) => {
  const querySpec = {
    query: `SELECT * from c 
            WHERE c.spk = @spk`,
    parameters: [
      {
        name: "@spk",
        value: spk,
      },
    ],
  };

  // read all items in the Items container
  const { resources } = await DBclient.container.items
    .query(querySpec)
    .fetchAll();

  return resources.map(({ username, name, avatar_url }) => ({
    username,
    name,
    avatar_url,
  }));
};
