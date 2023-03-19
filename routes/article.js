var express = require("express");
var router = express.Router();
const ArticleContoller = require("../Controller/ArticleController");
const EmployeeController = require("../Controller/EmployeeController");
const ManagerController = require("../Controller/ManagerController");
router.post("/add_article", function (req, res, next) {
  ArticleContoller.saveArticle(req, res, next);
});
router.get("/user_article_info", function (req, res, next) {
  ArticleContoller.getUserArticleInfo(req, res, next);
});

router.get("/employee_articles_info", function (req, res, next) {
  ArticleContoller.getEmployeesArticlesInfo(req, res, next);
});

router.get("", function (req, res, next) {
  ArticleContoller.getArticle(req, res, next);
});

module.exports = router;
