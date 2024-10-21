const mongoose = require("mongoose");

// Define the schema for a news article
const newsArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  source: {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
  tags: {
    type: [String],
    default: [],
  },
});

// Create the model from the schema
const NewsArticle = mongoose.model("NewsArticle", newsArticleSchema);

module.exports = NewsArticle;
