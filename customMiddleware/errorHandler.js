const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json({ message: "Duplicate key error" });
  }
  res.json({ message: err.message, stack: err.stack });
};
// to do -> switch different error message for different status
module.exports = errorHandler;
