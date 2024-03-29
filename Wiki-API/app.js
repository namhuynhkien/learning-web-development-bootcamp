const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect(
  // "mongodb://localhost/wikiDB",
  "mongodb+srv://todo-app-user:test123@cluster0.o8kf3.mongodb.net/WikiDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (!err) {
      console.log("Connected to DB successfully");
    } else {
      console.log(err);
    }
  }
);

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

app.get("/", function (req, res) {
  res.send("<h1>Hello world!</h1>");
});

app
  .route("/articles")
  .get(function (req, res) {
    Article.find(function (err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle.save(function (err) {
      if (!err) {
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) {
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });

app
  .route("/articles/:articleTitle")
  .get(function (req, res) {
    const articleTitle = req.params.articleTitle;
    Article.findOne({ title: articleTitle }, function (err, foundArticle) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching that title was found.");
      }
    });
  })
  .put(function (req, res) {
    Article.updateOne(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      function (err) {
        if (!err) {
          res.send("Successfully updated article.");
        } else {
          res.send(err);
        }
      }
    );
  })
  .patch(function (req, res) {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body },
      function (err) {
        if (!err) {
          res.send("Successfully updated corresponding article.");
        } else {
          res.send(err);
        }
      }
    );
  })
  .delete(function (req, res) {
    Article.deleteOne({ title: req.params.articleTitle }, function (err) {
      if (!err) {
        res.send("Successfully deleted article.");
      } else {
        res.send(err);
      }
    });
  });

app.listen(port, function () {
  console.log(`Start listening to port ${port}`);
});
