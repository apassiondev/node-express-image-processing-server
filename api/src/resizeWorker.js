const gm = require("gm");
const { workerData, parentPort } = require("worker_threads");

// Create the resize worker
// Resize the photo to be 100px by 100px
gm(workerData.source)
  .resize(100, 100)
  .write(workerData.destination, (error) => {
    if (error) throw error;

    parentPort.postMessage({
      resized: true,
    });
  });
