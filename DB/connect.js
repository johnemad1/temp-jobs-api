const mogoose = require("mongoose");

const connectDB = (url) => {
  return mogoose.connect(url);
};

module.exports = connectDB;
