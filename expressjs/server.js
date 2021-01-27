"use strict";
const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});
app.get("/contact", (req, res) => {
  res.send("Contact me at namhuynhkien@gmail.com.");
});
app.get("/about", (req, res) => {
  res.send("My nam is Nam and I am the owner of this service.");
});
app.get("/hobbies", (req, res) => {
  res.send("My hobbies are gaming, exercises and code");
});
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
