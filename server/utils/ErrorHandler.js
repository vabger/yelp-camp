module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.name === "ValidationError") {
    err.status = 422;
  }
  if (err.name === "CastError") {
    err.message = ""
  }

  return res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || "Something went wrong",
    },
  });
};
