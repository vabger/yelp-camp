const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
exports.createUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    throw new ExpressError(409, "Email already exists");
  }
  const user = new User({
    email,
    password,
  });
  const savedUser = await user.save();
  res.json({
    created: true,
    user: { id: savedUser._id, email: savedUser.email, role: savedUser.role },
  });
});

exports.getUsers = catchAsync(async (req, res) => {
  const users = await User.find({});
  res.json({ users });
});

exports.loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ExpressError(400, "email and password required!");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ExpressError(401, "Enter a valid email and password");
  }

  const isValid = user.compare(password);
  if (!isValid) {
    throw new ExpressError(401, "Enter a valid email and password");
  }

  req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  res.json({
    status: 200,
    message: "Login Successful!",
    currentUser: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  });
});

exports.logOutUser = (req, res, next) => {
  req.session.user = undefined;
  res.json({
    status: 200,
    message: "log out successful!",
  });
};

exports.currentUser = (req, res, next) => {
  res.json({
    currentUser: req.session.user,
  });
};
