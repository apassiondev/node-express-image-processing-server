const path = require("path");
const express = require("express");

const app = express();

const pathToIndex = path.resolve(__dirname, "../client/index.html");

// app.use(express.static(path.resolve(__dirname, "../client")));
app.use("/css", express.static(path.resolve(__dirname, "../client/css")));

app.use("/*", (request, response) => {
  response.sendFile(pathToIndex);
});

module.exports = app;
