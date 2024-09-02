const express = require("express")
const {getConstructorRankings, getDriverRankings, getRaceFixtures} = require("../controllers/formula1Controller")

const router = express.Router()

router.route("/constructorrankings").get(getConstructorRankings)
router.route("/driverrankings").get(getDriverRankings)
router.route("/racefixtures").get(getRaceFixtures)

module.exports = router