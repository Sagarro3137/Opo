// server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

// Serve static files
app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("voice", (data) => {
        socket.broadcast.emit("voice", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
