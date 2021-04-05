module.exports = (req, res, err) => {
  // We can put sentry over here or some kind of logger maybe!

  return res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Something went wrong with the server!",
    stack: err.stack,
  });
};
