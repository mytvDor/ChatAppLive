const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, "public")));

let secretCode = null; // Store the secret code

io.on("connection", function (socket) {
  socket.on("setSecretCode", function (code, callback) {
    // Set the secret code if it's not set yet
    if (!secretCode) {
      secretCode = code;
      callback({ success: true, message: "Secret code set. Waiting for users..." });
    } else {
      // If the secret code is already set, notify user
      callback({ success: false, message: "Secret code is already set." });
    }
  });

  socket.on("joinWithCode", function (code, callback) {
    // Verify the code
    if (code === secretCode) {
      callback({ success: true });
      socket.broadcast.emit("update", "A new user joined the conversation.");
    } else {
      callback({ success: false, message: "Incorrect secret code." });
    }
  });

  socket.on("newUser", function (username) {
    socket.broadcast.emit("update", `${username} joined the conversation`);
  });

  socket.on("exituser", function (username) {
    socket.broadcast.emit("update", `${username} left the conversation`);
  });

  socket.on("chat", function (message) {
    socket.broadcast.emit("chat", message);
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
