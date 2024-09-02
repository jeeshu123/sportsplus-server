const express = require("express")
const {getFixtures,getStandings} = require("../controllers/footballController")

const router = express.Router()

router.route("/fixtures").get(getFixtures)
router.route("/standings").get(getStandings)

module.exports = router