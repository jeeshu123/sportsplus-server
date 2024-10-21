const express = require("express");
// const {getConstructorRankings, getDriverRankings, getRaceFixtures} = require("../controllers/formula1Controller")
const { getBreakingNews } = require("../controllers/newsController.js");
const router = express.Router();

router.route("/breakingnews").get(getBreakingNews);
// router.route("/driverrankings").get(getDriverRankings)
// router.route("/racefixtures").get(getRaceFixtures)

module.exports = router;
