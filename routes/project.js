var express = require("express");
const { isUser, isAdminOrManager } = require("../Auth/AuthMiddleware");
var router = express.Router();
var ProjectController = require("../Controller/ProjectController");

router.post("/new-project", isAdminOrManager, async (req, res, next) => {
  await ProjectController.createProject(req, res, next);
});

router.get("/project-list", isUser, async (req, res, next) => {
  await ProjectController.getallProjects(req, res, next);
});

router.delete("/project-delete", isAdminOrManager, async (req, res, next) => {
  await ProjectController.deleteProjectById(req, res, next);
});

router.post("/assign-project", isAdminOrManager, function (req, res, next) {
  ProjectController.assignProjectToUser(req, res, next);
});

module.exports = router;
