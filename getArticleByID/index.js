module.exports = async function (context, req) {
  console.log(!req.query.article_id);
  if (!req.query.article_id) {
    context.res = {
      status: 400,
      body: {
        message: "bad request",
      },
    };
  } else {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: req.query.article_id,
    };
  }
};
