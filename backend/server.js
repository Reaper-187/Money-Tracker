const express = require("express");
const app = express();
const port = 5000;

app.listen(port, "localhost", () => {
  console.log("Server is on port " + port);
});
