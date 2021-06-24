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

  const { username, name, avatar_url } = resources[0];

  return {
    username,
    name,
    avatar_url,
  };
};
