const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req: any, res: any) => {
  res.send("<h1>Hello world!</h1>");
});

app.get("/contact", (req: any, res: any) => {
  res.send("Contact me at namhuynhkien@gmail.com.");
});

app.get("/about", (req: any, res: any) => {
  res.send("My nam is Nam and I am the owner of this service.");
});

app.get("/hobbies", (req: any, res: any) => {
  res.send("My hobbies are gaming, exercises and code");
});

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
