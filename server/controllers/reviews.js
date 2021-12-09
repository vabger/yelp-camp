const Review = require("../models/Review");

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

exports.postReview = catchAsync(async (req, res) => {
  const { body, rating } = req.body;
  const { user } = req.session;
  const { campground } = req;
  const review = new Review({
    body,
    rating,
    createdBy: user,
  });

  if (campground.reviews.length === 5) {
    throw new ExpressError(400, "You can't add more than five reviews");
  }

  const savedReview = await review.save();
  campground.reviews.push(savedReview);
  await campground.save();

  res.json({
    success: true,
    review: savedReview,
    campground,
  });
});

exports.getReviews = catchAsync(async (req, res) => {
  const { campground } = req;

  res.json({ reviews: campground.reviews });
});

exports.deleteReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const { campground } = req;

  const review = await Review.findById(reviewId);

  review.checkAuthor(req.user._id.toString());

  await review.remove();

  campground.reviews.filter((val) => val != reviewId);
  await campground.save();

  res.json({
    deleted: true,
    review,
  });
});
