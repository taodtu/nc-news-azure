const { fetchAticleByID } = require("../model/fetchArticleByID");
module.exports = async function (context, req) {
  if (!req.query.article_id) {
    context.res = {
      status: 400,
      body: {
        message: "bad request",
      },
    };
  } else {
    try {
      const result = await fetchAticleByID(req.query.article_id);
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: result,
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
  }
};
