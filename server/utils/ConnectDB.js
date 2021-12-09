const mongoose = require("mongoose");
module.exports = () => {
  mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
