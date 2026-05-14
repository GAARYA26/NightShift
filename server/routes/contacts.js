const express = require("express");
const router = express.Router();

const TrustedContact = require("../models/TrustedContact");

// ➕ ADD CONTACT
router.post("/", async (req, res) => {
  try {
    const { userId, name, phone, relationship } = req.body;

    const contact = await TrustedContact.create({
      userId,
      name,
      phone,
      relationship,
    });

    res.json({
      success: true,
      contact,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// 📥 GET CONTACTS
router.get("/:userId", async (req, res) => {
  try {
    const contacts = await TrustedContact.find({
      userId: req.params.userId,
    });

    res.json(contacts);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;