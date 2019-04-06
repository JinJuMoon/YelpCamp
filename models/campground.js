var mongoose = require("mongoose");

var campgroundSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String,
  commnet: {text: String, author: String}
});

module.exports = mongoose.model("campground", campgroundSchema);
