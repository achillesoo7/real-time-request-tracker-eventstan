"use strict";

const Router = require("express").Router();
const PingManagerService = require("../services/pingManager.js");
const SuccessResponseHandler = require("../utils/successResponseHandler");
const ErrorResponseHandler = require("../utils/errorResponseHandler");
const { PROCESS_PING } = require("../constants/routes/managePing.js");

module.exports = (CLIENT_SOCKET) => {
  
  // Route for processing ping
  Router.get(PROCESS_PING, (req, res) => {
    PingManagerService.processPing(CLIENT_SOCKET)
      .then((result) => {
        SuccessResponseHandler(req, res, result);
      })
      .catch((err) => {
        ErrorResponseHandler(req, res, err);
      });
  });

  return Router;
};
