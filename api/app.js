const path = require("path");
const express = require("express");
const router = require("./src/router");

const app = express();

const pathToIndex = path.resolve(__dirname, "../client/index.html");

// Wire up the router
app.use("/", router);

// Serves static files
app.use(express.static(path.resolve(__dirname, "uploads")));
app.use("/css", express.static(path.resolve(__dirname, "../client/css")));

// Send everything else to ./client/index.html
app.use("/*", (request, response) => {
  response.sendFile(pathToIndex);
});

module.exports = app;
