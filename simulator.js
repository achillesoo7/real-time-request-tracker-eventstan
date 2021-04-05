const request = require("request-promise");
const {
  PING_API_ENDPOINT,
  SIMULATOR_RUNNING_INTERVAL,
} = require("./constants/common");

let RUNNING = false;

async function run() {
  RUNNING = true;
  console.log("SENDING REQUEST");
  try {
    const result = await request.get(PING_API_ENDPOINT);
    RUNNING = false;
    console.log("REQUEST SENT SUCCESSFULLY!");
    return;
  } catch (e) {
    RUNNING = false;
    console.log("REQUEST SENT SUCCESSFULLY!");
    return;
  }
}

setInterval(() => {
  if (!RUNNING) {
    run();
  }
}, SIMULATOR_RUNNING_INTERVAL);
