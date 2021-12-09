module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    err.status = 422;
  }
  console.log(err);
  return res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || "Something went wrong",
    },
  });
};
