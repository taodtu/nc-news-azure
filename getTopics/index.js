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
    context.res = {
      status: 500,
      body: JSON.stringify({
        message: "get Topics fails",
      }),
    };
  }
};
