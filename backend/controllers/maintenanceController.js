const db = require("../config/db");

async function getAllMaintenanceLogs(req, res, next) {
  try {
    const [rows] = await db.query(
      "SELECT id, plant_id, task, assigned_to, status FROM maintenance_logs ORDER BY id DESC"
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
  getAllMaintenanceLogs,
};
