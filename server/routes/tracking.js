const express = require("express");
const router = express.Router();

router.post("/update-location", (req, res) => {
  const { lat, lng } = req.body;

  console.log("🚗 TRACKING:", lat, lng);

  const io = req.app.get("io");

  io.emit("providerLocation", { lat, lng });

  res.json({ message: "Tracking sent" });
});

module.exports = router;