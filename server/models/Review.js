const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");
const Schema = mongoose.Schema;

const Review = new Schema({
  body: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: [1, "Rating can't be less than 1"],
    max: [5, "Rating can't be greater than 5"],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

Review.methods.checkAuthor = function (id) {
  if (id !== this.createdBy.toString()) {
    throw new ExpressError(
      403,
      "You need to be author of the review to perform this action"
    );
  }
};

module.exports = mongoose.model("Review", Review);
