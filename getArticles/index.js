const { fetchAticles } = require("../model/fetchArticles");
module.exports = async function (context, req) {
  const res = await fetchAticles(req.query);

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: res,
  };
};
