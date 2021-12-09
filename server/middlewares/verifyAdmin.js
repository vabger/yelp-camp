const ExpressError = require("../utils/ExpressError");
module.exports = (req, res, next) => {
  if (req.session.user.role === "admin") {
    next();
  } else {
    next(new ExpressError(403, "admin status required!"));
  }
};
