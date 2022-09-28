const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const { ObjectId } = require("mongoose").Types;

// GET
router.get("/", (req, res) => {
  Article.find()
    .then((articles) => res.json(articles))
    .catch(() =>
      res.status(404).json({ noArticlesFound: "No Articles found" })
    );
});

// POST
router.post("/", (req, res) => {
  Article.create(req.body)
    .then(() => res.json({ msg: "Article added successfully" }))
    .catch((err) =>
      res
        .status(400)
        .json({ error: `Unable to add this article. ${err.message}` })
    );
});

// PUT
router.put("/moderate/:id", (req, res) => {
  const id = ObjectId(req.params.id);
  Article.updateOne({ _id: { $eq: id } }, { moderated: true })
    .then(() => res.json({ msg: "Article moderated successfully" }))
    .catch((err) =>
      res
        .status(400)
        .json({ error: `Unable to moderate this article. ${err.message}` })
    );
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = ObjectId(req.params.id);
  Article.deleteOne({ _id: { $eq: id } })
    .then(() => res.json({ msg: "Article deleted successfully" }))
    .catch((err) =>
      res
        .status(400)
        .json({ error: `Unable to delete this article. ${err.message}` })
    );
});

module.exports = router;
