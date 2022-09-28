const express = require("express");
const router = express.Router();
const Practice = require("../models/Practice");

// GET
router.get("/", (req, res) => {
    Practice
        .find()
        .then((practices) => res.json(practices))
        .catch((err) => res.status(404).json({noPracticesFound: `No practices found: ${err.message}`}));
});

// POST
router.post("/", (req, res) => {
    Practice
        .create(req.body)
        .then(() => res.json({msg: "Practice added successfully"}))
        .catch((err) => res.status(404).json({practiceAddFailed: `Failed to add the practice: ${err.message}`}));
});

module.exports = router;