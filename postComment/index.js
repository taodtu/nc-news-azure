const { createComment } = require("../model/createComment");
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
      const result = await createComment(req.body);
      context.res = {
        status: 200,
        body: result,
      };
    } catch (e) {
      console.log(e);
      context.res = {
        status: 500,
        body: JSON.stringify({
          message: "create Comment fails",
        }),
      };
    }
  }
};
