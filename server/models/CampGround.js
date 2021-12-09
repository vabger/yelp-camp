const mongoose = require("mongoose");
const Review = require("../models/Review");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Schema = mongoose.Schema;

const campground = new Schema({
  title: {
    type: String,
    required: [true, "Enter a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Add a Description"],
    minLength: [100, "Description should be at least 100 characters long"],
    maxLength: [1000, "Description can't exceed 1000 characters"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Enter a location"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Enter a price"],
    min: [0, "Price can't be negative"],
    max: [10000000, "Price can't exceed $10,000,000"],
  },
  images: [
    {
      _id: false,
      url: {
        type: String,
        default: "http://localhost:5000/campgrounds/images/1.jpg",
      },
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      required: [true, "Review is required"],
      ref: "Review",
    },
  ],
});

campground.methods.checkAuthor = function (id) {
  if (id !== this.createdBy.toString()) {
    throw new ExpressError(
      403,
      "You need to be author of the campground to perform this action"
    );
  }
};

campground.post("remove", async function (doc) {
  await Review.deleteMany({ _id: { $in: doc.reviews } });
});

module.exports = mongoose.model("Campground", campground);
