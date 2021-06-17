const { fetchTopics } = require("../model/fetchTopics");
module.exports = async function (context) {
  const res = await fetchTopics();
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: res,
  };
};
