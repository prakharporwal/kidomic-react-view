const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen("8080", () => {
  console.log("started on 8080");
});
