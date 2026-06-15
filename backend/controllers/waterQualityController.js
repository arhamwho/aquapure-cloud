const db = require("../config/db");

async function getAllWaterQuality(req, res, next) {
  try {
    const [rows] = await db.query(
      "SELECT id, plant_id, ph, chlorine, quality_score, created_at FROM water_quality ORDER BY created_at DESC"
    );

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
  getAllWaterQuality,
};
