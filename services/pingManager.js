const {
  PING_REPOSNE_CASES_PROBABILITIES,
  PING_REPOSNE_CASES_TYPE,
  REQUEST_TRACKER_OBJECT,
} = require("../constants/common");
const { sleep, getRandomInteger } = require("../utils/helpers");

// Service specific data containers
let probabilityInitializer, indexToTrack;
///////////////////////////////////

exports.processPing = (CLIENT_SOCKET) =>
  new Promise(async (resolve, reject) => {
    try {
      /** Randomly sleeping for 1 or 2 seconds */
      const randomNumber = getRandomInteger(1000, 2000);
      await sleep(randomNumber);
      /** //////////////////////////////////// */

      /** Determining response type basis on probability and updating tracker */
      let arrayIndex = getRandomIndexByProbability(
        PING_REPOSNE_CASES_PROBABILITIES
      );

      const responseType = PING_REPOSNE_CASES_TYPE[arrayIndex];
      REQUEST_TRACKER_OBJECT[responseType] += 1;

      if (CLIENT_SOCKET.socket) {
        CLIENT_SOCKET.socket.emit(
          "tracker_object_updated",
          REQUEST_TRACKER_OBJECT
        );
      }
      /** ////////////////////////////////////////////////////////////////// */

      /** Assigning status code and message basis on the responseType */
      let statusCode, responseMessage;

      switch (responseType) {
        case "success":
          statusCode = 200;
          responseMessage = "Successfully got users list!";
          break;
        case "info":
          statusCode = 201;
          responseMessage = "Got data for last one year!";
          break;
        case "error":
          statusCode = 500;
          responseMessage = "Internal Server Error";
          break;
        case "debug":
          statusCode = 503;
          responseMessage =
            "Service unavailable due to overload, please try again";
          break;
        default:
          statusCode = 200;
          responseMessage = "Successfully got users list!";
          break;
      }
      /** /////////////////////////////////////////////////////////// */

      if (statusCode < 300 && statusCode > 200) {
        return resolve({
          status: statusCode,
          message: responseMessage,
        });
      } else {
        return reject({
          status: statusCode,
          message: responseMessage,
        });
      }
    } catch (e) {
      console.log(e);
      return reject({
        status: 500,
        message: "Something went wrong with the server!",
      });
    }
  });

// Service specific functions
function getRandomIndexByProbability(probabilities) {
  var r = Math.random(),
    indexToTrack = probabilities.length - 1;

  probabilities.some(function (probability, probabilityInitializer) {
    if (r < probability) {
      indexToTrack = probabilityInitializer;
      return true;
    }
    r -= probability;
  });
  return indexToTrack;
}
/////////////////////////////
