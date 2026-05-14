const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// 🔥 SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 🔥 SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// make io available in routes
app.set("io", io);

// 🔥 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔥 DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

// 🔥 ROUTES
const authRoutes = require("./routes/auth");
console.log("AUTH:", authRoutes);

const businessRoutes = require("./routes/business");
console.log("BUSINESS:", businessRoutes);

const sosRoutes = require("./routes/sos");
console.log("SOS:", sosRoutes);
const contactRoutes = require("./routes/contacts");
app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/sos", sosRoutes);
// 🔥 API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/contacts", contactRoutes);
// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("🚀 NightShift API Running");
});

// 🔥 SERVER START
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});