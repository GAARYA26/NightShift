const express = require("express");
const router = express.Router();

const SOSRequest = require("../models/SOSRequest");

// 🚨 CREATE SOS
router.post("/", async (req, res) => {
  try {
    const { userId, lat, lng } = req.body;

    const sos = await SOSRequest.create({
      userId,

      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });

    const io = req.app.get("io");

    io.emit("newSOS", sos);

    res.json({
      success: true,
      sos,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// 🚀 ACCEPT SOS
router.post("/accept/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { acceptedBy } = req.body;

    const sos = await SOSRequest.findById(id);

    if (!sos) {
      return res.status(404).json({
        message: "SOS not found",
      });
    }

    sos.status = "accepted";
    sos.acceptedBy = acceptedBy;

    await sos.save();

    const io = req.app.get("io");

    io.emit("sosAccepted", sos);

    res.json({
      success: true,
      sos,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;