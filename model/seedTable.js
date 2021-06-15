const {topicData} =require("../data/index");
const {CosmosClient} = require("@azure/cosmos")

exports.seedTable = async ()=> {

    const client = new CosmosClient(process.env.DB_CONNECTION);
    const database = client.database(process.env.DB_ID);
    const container = database.container(process.env.CONTAINER_PRIMARY)
    await Promise.all(topicData.map(topic=>container.items.create(topic)));
    return 

}