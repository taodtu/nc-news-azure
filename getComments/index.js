const { fetchComments } = require("../model/fetchComments");
module.exports = async function (context, req) {
  const { username, article_id } = req.query;
  if (!(username || article_id)) {
    context.res = {
      status: 400,
      body: {
        message: "bad request",
      },
    };
  } else {
    try {
      const result = await fetchComments({ username, article_id }, req.query);
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: result,
      };
    } catch (e) {
      console.log(e);
      context.res = {
        status: 500,
        body: JSON.stringify({
          message: "get comments fails",
        }),
      };
    }
  }
};
