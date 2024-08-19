console.log("it works...");
//  imported packages

const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.set("view engine", "ejs");

// setup
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  "mongodb+srv://ui:abc123.@cluster0.abpuu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
  .then((client) => {
    console.log("connected to the database😀😀😀😀");
    const db = client.db("starwars-quotes");
    const quoteCollection = db.collection("quotes");
    //crud
    app.listen(3000, (_) => {
      console.log("listening on port 3000");
    });
    console.log(__dirname);

    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
        })
        .catch((error) => console.error(error));
    });

    app.post("/quotes", (req, res) => {
      quoteCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));
