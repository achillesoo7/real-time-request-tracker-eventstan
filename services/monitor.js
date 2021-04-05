const { REQUEST_TRACKER_OBJECT } = require("../constants/common");

exports.getMonitorStats = (io) =>
  new Promise((resolve, reject) => {
    return resolve(REQUEST_TRACKER_OBJECT);
  });
