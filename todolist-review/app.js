const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const listItems = ["Wake up", "Breakfast", "Go to work"];

app.get("/", function (req, res) {
  res.render("list", { items: listItems });
});

app.post("/", function (req, res) {
  if (req.body.newItem.trim()) listItems.push(req.body.newItem);
  res.redirect("/");
});

app.listen(port, function () {
  console.log(`Running on port ${port}`);
});
