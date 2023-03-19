var express = require("express");
const { isAdmin, isUser } = require("../Auth/AuthMiddleware");
var router = express.Router();
var DomainController = require("../Controller/DomainController");

router.post("/upload-csv", isAdmin, async (req, res, next) => {
  await DomainController.addDomainDataList(req, res, next);
});
router.get("/domain-list", isUser, async (req, res, next) => {
  await DomainController.getallDomains(req, res, next);
});

router.post("/link-data", isUser, async (req, res, next) => {
  await DomainController.addLinkData(req, res, next);
});

router.put("/domain-link", isUser, async (req, res, next) => {
  await DomainController.editDomainLinkData(req, res, next);
});
module.exports = router;
