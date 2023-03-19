var Article = require("../Models/Article");
var mongoose = require("mongoose");
var User = require("../Models/User");
var ObjectConverter = require("../Util/ObjectConverter");
var AuthMiddleware = require("../Auth/AuthMiddleware");
const saveArticle = async (req, res, next) => {
  try {
    const article = req.body;
    let articleData = {
      title: article.title,
      content: article.content,
      userId: article.userId,
      authorName: article.authorName,
      created_Date: new Date().toJSON().slice(0, 10),
    };
    const user = User.findById(article.userId);
    if (user != null) {
      const newArticle = new Article(articleData);
      await newArticle.save();
      return res.send({ message: "Article Successfully Saved" });
    } else {
      return next({ message: "User Not Exist" });
    }
  } catch (err) {
    return next({ message: err.message });
  }
};

const getUserArticleInfo = async (req, res, next) => {
  try {
    const userId = AuthMiddleware.tokenDetail(req)._id;
    let { page, size } = req.query;
    let filter = { userId };
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }

    const limit = parseInt(size);
    const total = await Article.find(filter);
    const articles = await Article.find(filter)
      .sort({ votes: 1, _id: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const articlesInfo = ObjectConverter.articleListToArticleInfoList(articles);

    res.send({
      data: {
        articlesInfo,
        total: total.length / size,
        articlesDetails: articles,
      },
    });
  } catch (error) {
    return next({
      response: { data: { message: { message: "Something went wrong" } } },
    });
  }
};

const getEmployeesArticlesInfo = async (req, res, next) => {
  try {
    const user = AuthMiddleware.tokenDetail(req);
    let { page, size, userId } = req.query;
    const query = { userId };
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    const limit = parseInt(size);
    if (user.role === "MNG") {
      const employee = await User.findById(userId);
      if (employee.managerId != user._id) {
        return next({ message: "User Id Not Belongs To Your Employee" });
      }
    }

    const total = await Article.find(query);
    const articles = await Article.find(query)
      .sort({ votes: 1, _id: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const articlesInfo = ObjectConverter.articleListToArticleInfoList(articles);

    res.send({
      data: {
        articlesInfo,
        total: total.length / size,
        articlesDetails: articles,
      },
    });
  } catch (error) {
    return next({
      response: { data: { message: { message: "Something went wrong" } } },
    });
  }
};

const getArticle = async (req, res, next) => {
  try {
    let { articleId } = req.query;
    const article = await Article.findById(articleId);

    res.send({
      data: { article },
    });
  } catch (error) {
    return next({
      response: { data: { message: { message: "Something went wrong" } } },
    });
  }
};

module.exports = {
  saveArticle,
  getUserArticleInfo,
  getEmployeesArticlesInfo,
  getArticle,
};
