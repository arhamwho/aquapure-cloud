const db = require("../config/db");

async function getAllPlants(req, res, next) {
  try {
    const [rows] = await db.query("SELECT * FROM plants");

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllPlants,
};
