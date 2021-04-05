"use strict";

const Router = require("express").Router();
const MonitorService = require("../services/monitor");
// const SuccessResponseHandler = require("../utils/successResponseHandler");
// const ErrorResponseHandler = require("../utils/errorResponseHandler");
const { MONITOR_STATS } = require("../constants/routes/monitor");

module.exports = (CLIENT_SOCKET) => {
  // Route for processing ping
  Router.get(MONITOR_STATS, (req, res) => {
    MonitorService.getMonitorStats(CLIENT_SOCKET)
      .then((stats) => {
        return res.render("monitoring_dashboard", { stats });
      })
      .catch((err) => {
        return res.render("error", { err });
      });
  });

  return Router;
};
