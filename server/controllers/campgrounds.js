const CampGround = require("../models/CampGround");
const catchAsync = require("../utils/catchAsync");
const QueryBuilder = require("../QueryBuilder");

exports.getCampgroundById = catchAsync(async (req, res) => {
  const campground = req.campground;
  res.json({ campground });
});

exports.getAllCampgrounds = catchAsync(async (req, res) => {
  const { page = 0, limit = 10 } = req.query;
  const query = new QueryBuilder(CampGround.find({})).paginate(page, limit);
  const campgrounds = await query;
  res.json({ campgrounds });
});

exports.addCampground = catchAsync(async (req, res) => {
  const { title, location, description, price } = req.body;

  const images = req.files.map((f) => {
    return {
      url: `http://${process.env.DOMAIN}/uploads/campgrounds/${f.filename}`,
    };
  });

  const newCampground = new CampGround({
    title,
    price,
    description,
    location,
    images,
    createdBy: req.session.user,
  });
  const saved = await newCampground.save();
  res.json(saved);
});

exports.updateCampground = catchAsync(async (req, res) => {
  const { campground } = req;
  const userId = req.user._id.toString();

  campground.checkAuthor(userId);

  campground = { ...campground, ...req.body };
  const updatedCampground = await campground.save();
  res.json(updatedCampground);
});

exports.deleteCampground = catchAsync(async (req, res) => {
  const { campground } = req;
  const userId = req.user._id.toString();

  campground.checkAuthor(userId);

  const deletedCampground = await campground.remove();
  res.json({ success: true, deletedCampground });
});
