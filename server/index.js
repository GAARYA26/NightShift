const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server =
  http.createServer(app);

// 🔥 SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 🔥 SOCKET CONNECTION
io.on("connection", (socket) => {

  console.log(
    "⚡ User connected:",
    socket.id
  );

  socket.on(
    "disconnect",
    () => {

      console.log(
        "❌ User disconnected:",
        socket.id
      );
    }
  );
});

// 🔥 MAKE IO AVAILABLE
app.set("io", io);

// 🔥 MIDDLEWARE
app.use(
  cors({
    origin: "*",
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    credentials: true,
  })
);

// ✅ VERY IMPORTANT
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// 🔥 DATABASE
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {

    console.log(
      "✅ MongoDB Connected"
    );

  })
  .catch((err) => {

    console.log(
      "❌ MongoDB Error:",
      err
    );

  });

// 🔥 ROUTES
const authRoutes =
  require("./routes/auth");

const businessRoutes =
  require("./routes/business");

const sosRoutes =
  require("./routes/sos");

const contactRoutes =
  require("./routes/contacts");

// 🔥 API ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/business",
  businessRoutes
);

app.use(
  "/api/sos",
  sosRoutes
);

app.use(
  "/api/contacts",
  contactRoutes
);

// 🔥 TEST ROUTE
app.get("/", (req, res) => {

  res.send(
    "🚀 NightShift API Running"
  );

});

// 🔥 SERVER START
const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `🔥 Server running on port ${PORT}`
  );

});