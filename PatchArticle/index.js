const { updateArticleByID } = require("../model/updateArticleByID");
module.exports = async function (context, req) {
  if (!(req.query.article_id && req.body)) {
    context.res = {
      status: 400,
      body: {
        message: "bad request",
      },
    };
  } else {
    try {
      const result = await updateArticleByID(req.query.article_id, req.body);
      context.res = {
        status: 200,
        body: result,
      };
    } catch (e) {
      console.log(e);
      context.res = {
        status: 500,
        body: JSON.stringify({
          message: "update Article fails",
        }),
      };
    }
  }
};
