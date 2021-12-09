const CampGround = require("../models/CampGround");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
module.exports = catchAsync(async (req, res, next) => {
  const campground = await CampGround.findById(req.params.id).populate({
    path: "reviews",
    populate: {
      path: "user",
    },
  });
  if (!campground) {
    throw new ExpressError(404, "Campground not found!");
  }
  req.campground = campground;
  next();
});
