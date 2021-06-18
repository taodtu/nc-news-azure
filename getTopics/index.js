const { fetchTopics } = require("../model/fetchTopics");
module.exports = async function (context) {
  try {
    const res = await fetchTopics();
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: res,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "get Articles fails",
      }),
    };
  }
};
