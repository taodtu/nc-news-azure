const { deleteComment } = require("../model/deleteComment");
module.exports = async function (context, req) {
  if (!req.body) {
    context.res = {
      status: 400,
      body: {
        message: "bad request",
      },
    };
  } else {
    try {
      const result = await deleteComment(req.body);
      context.res = {
        status: 200,
        body: result,
      };
    } catch (e) {
      console.log(e);
      context.res = {
        status: 500,
        body: JSON.stringify({
          message: "delete Comment fails",
        }),
      };
    }
  }
};
