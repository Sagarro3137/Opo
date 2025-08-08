// server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static frontend files from /public folder
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("🔌 New user connected");

    // Receive audio from broadcaster and send to others
    socket.on("voice", (data) => {
        socket.broadcast.emit("voice", data);
    });

    socket.on("disconnect", () => {
        console.log("❌ User disconnected");
    });
});

// Choose PORT from environment or default to 10000
const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
