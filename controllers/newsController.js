const mongoose = require("mongoose");
const NewsArticle = require("../models/newsModels/NewsArticle");

const saveArticlesWithKeyword = async (articles, keyword) => {
  try {
    for (const article of articles) {
      const containsKeyword =
        article.title.toLowerCase().includes(keyword.toLowerCase()) ||
        (article.description &&
          article.description.toLowerCase().includes(keyword.toLowerCase())) ||
        (article.content &&
          article.content.toLowerCase().includes(keyword.toLowerCase()));
      const articleAvailable = await NewsArticle.findOne({
        title: article.title,
      });
      if (containsKeyword && !articleAvailable) {
        const newArticle = new NewsArticle({
          title: article.title,
          description: article.description,
          content: article.content,
          url: article.url,
          image: article.image,
          publishedAt: new Date(article.publishedAt),
          source: {
            name: article.source.name,
            url: article.source.url,
          },
          tags: [keyword],
        });

        await newArticle.save();
        console.log(`Saved article: ${article.title}`);
      }
    }
    console.log("All relevant articles have been saved.");
  } catch (error) {
    console.error("Error saving articles:", error);
  }
};

const getBreakingNews = async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      res.json({
        message: "Need a query to search",
        status: "Failed",
      });
    }
    const articles = await NewsArticle.find({ tags: topic });
    // res.json(articles);
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=sports&lang=en&max=100&apikey=${process.env.GNEWS_API_KEY}&q=${topic}`
    );
    const data = await response.json();
    if (response.ok) {
      saveArticlesWithKeyword(data.articles, topic);
    }
    res.json(data.articles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getBreakingNews };
