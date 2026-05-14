const express = require("express");
const router = express.Router();
const Business = require("../models/Business");

// 🔥 HEARTBEAT / GO LIVE
router.post("/heartbeat", async (req, res) => {
  try {
    const { owner, name, lat, lng, type } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({
        message: "Location required",
      });
    }

    let business = await Business.findOne({
      owner,
      name,
    });

    if (business) {
      business.location = {
        type: "Point",
        coordinates: [lng, lat],
      };

      business.type = type;
      business.heartbeatAt = new Date();
      business.isOpen = true;

      await business.save();
    } else {
      business = await Business.create({
        owner,
        name,
        type,

        location: {
          type: "Point",
          coordinates: [lng, lat],
        },

        heartbeatAt: new Date(),
      });
    }

    const io = req.app.get("io");

    io.emit("businessUpdated", business);

    res.json({
      success: true,
      business,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// 📍 FIND NEARBY SERVICES
router.get("/nearby", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const businesses = await Business.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },

          $maxDistance: 5000,
        },
      },
    });

    res.json(businesses);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// 🔥 GET ACTIVE SERVICES
router.get("/live", async (req, res) => {
  try {
    const oneMinuteAgo = new Date(Date.now() - 60000);

    const businesses = await Business.find({
      heartbeatAt: {
        $gte: oneMinuteAgo,
      },
    });

    res.json(businesses);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;