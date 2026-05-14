const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "mechanic",
        "hospital",
        "pharmacy",
        "police",
        "taxi",
        "fuel",
      ],
      default: "mechanic",
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

    isOpen: {
      type: Boolean,
      default: true,
    },

    heartbeatAt: {
      type: Date,
      default: Date.now,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,
    },
  },
  {
    timestamps: true,
  }
);

BusinessSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Business", BusinessSchema);