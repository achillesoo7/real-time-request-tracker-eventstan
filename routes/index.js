"use strict";

const PingManager = require("./managePing");
const Monitor = require("./monitor");

module.exports = (app, CLIENT_SOCKET) => {
    app.use("/api/ping", PingManager(CLIENT_SOCKET));
    app.use("/monitor", Monitor(CLIENT_SOCKET))
};
