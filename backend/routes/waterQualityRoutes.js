const express = require("express");
const { getAllWaterQuality } = require("../controllers/waterQualityController");

const router = express.Router();

router.get("/", getAllWaterQuality);

module.exports = router;
