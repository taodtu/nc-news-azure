const { fetchAticles } = require("../model/fetchArticles");
module.exports = async function (context, req) {
  try {
    const res = await fetchAticles(req.query);

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: res,
    };
  } catch (e) {
    console.log(e);
    context.res = {
      status: 500,
      body: JSON.stringify({
        message: "get Articles fails",
      }),
    };
  }
};
