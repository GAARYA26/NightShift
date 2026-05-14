let io;

function initSocket(serverIO) {
  io = serverIO;

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

function getIO() {
  return io;
}

module.exports = { initSocket, getIO };