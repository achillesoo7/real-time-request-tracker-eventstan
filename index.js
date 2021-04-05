"use strict";

const express = require("express");
const app = express();
const http = require("http").Server(app);
const ejs = require("ejs");
const path = require("path");
const io = require("socket.io")(http);
const MountAPI = require("./routes");

console.log("COMING IN FILE");
let CLIENT_SOCKET = { soket: undefined };

// Configuring view engine

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//////////////////////////

// Configuring parser

app.use(
  express.json({
    type: [
      "application/json",
      "text/plain", // AWS sends this content-type for its messages/notifications
    ],
  })
);

app.use(express.urlencoded({ extended: false }));

///////////////////////////////////////////////

// Configuring public folder

app.use(express.static(path.join(__dirname, "public")));

////////////////////////////

io.on("connection", (socket) => {
  CLIENT_SOCKET.socket = socket;
});

// Mounting API

MountAPI(app, CLIENT_SOCKET);

///////////////

// Handle 404

app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "Sorry the requested api endpoint not found",
  });
});

/////////////

http.listen(3000, () => {
  console.log("listening on *:3000");
});
