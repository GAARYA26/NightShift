const mongoose = require("mongoose");

const SafetySessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  trustedContact: { type: String, required: true },

  lastCheckIn: { type: Date, default: Date.now },

  lastLocation: {
    lat: Number,
    lng: Number,
  },

  isActive: { type: Boolean, default: true },

  alertSent: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SafetySession", SafetySessionSchema);