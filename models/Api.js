const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  author: "",
  title: String,
  description: "",
  urlToImage: "",
  publishedAt: "",
  content: "",
});

module.exports = mongoose.model("Api", NewsSchema);
