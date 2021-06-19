const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient(process.env.DB_CONNECTION);
const database = client.database(process.env.DB_ID);
const container = database.container(process.env.CONTAINER_PRIMARY);
const container_2 = database.container(process.env.CONTAINER_2);

exports.DBclient = {
  client,
  database,
  container,
  container_2,
};
