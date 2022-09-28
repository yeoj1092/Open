const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  source: { type: String, required: true },
  pubyear: { type: Number, required: true },
  doi: { type: String, required: true },
  claim: { type: String, required: false },
  evidence: { type: String, required: false },
  sepractice: { type: String, required: true },
  moderated: { type: Boolean, required: true },
  approved: { type: Boolean, required: true },
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
