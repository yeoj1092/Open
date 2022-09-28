const mongoose = require("mongoose");

const practiceSchema = new mongoose.Schema({
  practice: { type: String, required: true },
});

const Practice = mongoose.model("Practice", practiceSchema);
module.exports = Practice;
