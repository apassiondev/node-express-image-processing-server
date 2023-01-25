const app = require("./app");

module.exports = app.listen(3000, () => {
  console.log(`App running on port: http://localhost:${3000}`);
});
