const CampGround = require("../models/CampGround");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose")

module.exports = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(404, "Can't find what you are looking for!")
  }

  const campground = await CampGround.findById(id).populate({
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
