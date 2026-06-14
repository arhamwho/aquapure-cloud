const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const plantRoutes = require("./routes/plantRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "AquaPure Water Treatment Cloud",
    status: "running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
  });
});

app.use("/api/plants", plantRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);

  res.status(500).json({
    success: false,
    error: err.message,
  });
});

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    await db.testConnection();
    console.log("MySQL connected successfully");

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`  Root:   http://localhost:${PORT}/`);
      console.log(`  Health: http://localhost:${PORT}/health`);
      console.log(`  Plants: http://localhost:${PORT}/api/plants`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Try: PORT=5002 npm run dev`);
      } else {
        console.error("Server error:", err.message);
      }
      process.exit(1);
    });
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
}

startServer();
