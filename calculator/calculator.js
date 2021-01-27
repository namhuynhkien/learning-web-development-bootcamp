const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 80;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  let num1 = req.body.num1;
  let num2 = req.body.num2;
  let result = +num1 + +num2;
  res.send(`The result is ${result}`);
});

app.get("/bmicalculator", (req, res) => {
  res.sendFile(`${__dirname}/bmiCalculator.html`);
});

app.post("/bmicalculator", (req, res) => {
  let weight = req.body.weight;
  let height = req.body.height;
  let result = weight / (height * height);
  res.send(`Your BMI is ${result}`);
});

app.listen(port, function () {
  console.log(`Listening to port ${port}`);
});
