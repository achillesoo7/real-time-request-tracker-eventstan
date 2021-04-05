module.exports = (req, res, result = {}) => {
  // We can put sentry over here or some kind of logger maybe!

  return res.status(result.status || 200).json({
    status: result.status || 200,
    message: result.message || "successful!",
    data: result.data,
  });
};
