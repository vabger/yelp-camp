const ExpressError = require("../utils/ExpressError");

module.exports = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  next(new ExpressError(401, "Login required!"));
};
