const express = require("express");
const { addTrain, getAvailableTrains } = require("../controllers/trainController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = express.Router();

router.post("/add", adminMiddleware, addTrain);
router.get("/availability", getAvailableTrains);

module.exports = router;
