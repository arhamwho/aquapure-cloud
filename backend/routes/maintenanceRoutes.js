const express = require("express");
const { getAllMaintenanceLogs } = require("../controllers/maintenanceController");

const router = express.Router();

router.get("/", getAllMaintenanceLogs);

module.exports = router;
