const express = require("express");
const { bookSeat } = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/book", authMiddleware, bookSeat);

module.exports = router;
