const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const port = 3000;

mongoose.connect("mongodb://localhost/todo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemSchema = { name: String };
const Item = mongoose.model("items", itemSchema);
const listSchema = { name: String, items: [itemSchema] };
const List = mongoose.model("lists", listSchema);

const defaultItems = [
  new Item({ name: "Test 1" }),
  new Item({ name: "Test 2" }),
  new Item({ name: "Test 3" }),
];
let todoItems = [];
let workItems = [];

app.get("/", function (req, res) {
  Item.find(function (err, items) {
    res.render("list", { listTitle: "Today", newListItems: items });
  });
});

app.get("/:customListName", function (req, res) {
  const customListName = req.params.customListName;
  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new List({ name: customListName, items: defaultItems });
        list.save();
        res.redirect(`/${customListName}`);
      } else {
        res.render("list", {
          listTitle: customListName,
          newListItems: foundList.items,
        });
      }
    }
  });
});

app.post("/", function (req, res) {
  const newItem = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({ name: newItem });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  console.log(req.body.checkbox);

  Item.findByIdAndRemove(
    req.body.checkbox,
    { useNewUrlParser: true, useFindAndModify: false },
    function (err) {
      if (!err) {
        console.log("Item has been deleted");
        res.redirect("/");
      }
    }
  );
});

app.listen(port, function () {
  console.log(`Running on port: ${port}`);
});
