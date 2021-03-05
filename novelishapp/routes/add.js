const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const connectionKey = require("../mongoDBFolder/mongoDBInfo");
const path = require("path");

router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "/../public/add.html"));
});

router.post("/", function (req, res, next) {
  MongoClient.connect(
    connectionKey,
    {
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) return console.error(err);
      console.log("Connected to Database");
      const db = client.db("novelishDatabase");
      const newId = ObjectId();
      db.collection("reviews").insertOne({
        _id: newId,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        genre: req.body.bookGenre,
        rating: req.body.rating,
        userReview: req.body.userReview,
      });
      db.collection(req.body.bookGenre).insertOne({
        reviewID: newId,
      });
    }
  );
  res.redirect("/");
});

module.exports = router;
