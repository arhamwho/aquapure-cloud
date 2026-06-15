const db = require("../config/db");

async function getAllAlerts(req, res, next) {
  try {
    const [rows] = await db.query(
      "SELECT id, message, severity, status FROM alerts ORDER BY id DESC"
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
  getAllAlerts,
};
