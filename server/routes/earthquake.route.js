const express = require("express");
const EarthQuakeController = require("../controller/earthquake.controller");


const router = express.Router();

router.route("/load-data").post(EarthQuakeController.saveEarthQuakeReading);
router.route("/readings-monthly").get(EarthQuakeController.getMonthlyEarthQuakeReading);
router.route("/readings-daily").get(EarthQuakeController.getDailyEarthQuakeReading);


module.exports = router;
