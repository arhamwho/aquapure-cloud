const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "AquaPure Cloud API",
    status: "running",
    endpoints: {
      health: "/health",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    message: "AquaPure Backend Running",
  });
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`  Root:   http://localhost:${PORT}/`);
  console.log(`  Health: http://localhost:${PORT}/health`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Try: PORT=5002 npm run dev`);
  } else {
    console.error("Server error:", err.message);
  }
  process.exit(1);
});
