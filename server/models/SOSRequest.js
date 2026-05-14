const mongoose = require("mongoose");

const SOSRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        required: true,
      },
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "resolved"],
      default: "pending",
    },

    acceptedBy: {
      type: String,
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400,
    },
  },
  {
    timestamps: true,
  }
);

SOSRequestSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("SOSRequest", SOSRequestSchema);