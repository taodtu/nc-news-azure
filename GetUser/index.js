const { fetchUser } = require("../model/fetchUser");
module.exports = async function (context, req) {
  console.log(!req.query.username);
  if (!req.query.username) {
    context.res = {
      status: 400,
      body: {
        message: "bad request",
      },
    };
  } else {
    try {
      const result = await fetchUser(req.query.username);
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: result,
      };
    } catch (e) {
      console.log(e);
      context.res = {
        status: 500,
        body: JSON.stringify({
          message: "get User fails",
        }),
      };
    }
  }
};
