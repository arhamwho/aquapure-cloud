const express = require("express");
const { getAllPlants } = require("../controllers/plantController");

const router = express.Router();

router.get("/", getAllPlants);

module.exports = router;
