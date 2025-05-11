//Michael Sidoruk, Nadav Sayag

const express = require("express");
const router = express.Router();
const dbSingleton = require("./dbSingleton");
const db = dbSingleton.getConnection();

// POST - Create article
router.post("/", (req, res) => {
    const { author, content, title } = req.body;

    if (!author || !content || !title || typeof author !== "string" || typeof content !== "string" || typeof title !== "string") {
        return res.status(400).json({ error: "All fields (title, content, author) must be non-empty strings" });
    }

    const sql = "INSERT INTO articles (title, content, author) VALUES (?, ?, ?)";
    db.query(sql, [title, content, author], (err, result) => {
        if (err) return res.status(500).json({ err });
        res.status(201).json({ message: "Article created", articleId: result.insertId });
    });
});

// GET - All articles
router.get("/", (req, res) => {
    const sql = "SELECT * FROM articles";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ err });
        res.status(200).json(results);
    });
});

// GET - Articles by author
router.get("/author/:author", (req, res) => {
    const author = req.params.author;
    if (!author || typeof author !== "string") {
        return res.status(400).json({ error: "Author must be a valid string" });
    }

    const sql = "SELECT * FROM articles WHERE author = ?";
    db.query(sql, author, (err, results) => {
        if (err) return res.status(500).json({ err });
        if (results.length === 0) return res.status(404).json({ error: "No articles found for this author" });
        res.status(200).json(results);
    });
});

// GET - Articles after a certain date
router.get("/date/:date", (req, res) => {
    const date = new Date(req.params.date);
    if (isNaN(date.getTime())) return res.status(400).json({ error: "Invalid date format" });

    const sql = "SELECT * FROM articles WHERE created_at > ?";
    db.query(sql, date, (err, results) => {
        if (err) return res.status(500).json({ err });
        if (results.length === 0) return res.status(404).json({ error: "No articles found after this date" });
        res.status(200).json(results);
    });
});

// GET - Articles sorted by date
router.get("/sort", (req, res) => {
    const sql = "SELECT * FROM articles ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ err });
        res.status(200).json(results);
    });
});

// GET - Number of articles
router.get("/count", (req, res) => {
    const sql = "SELECT COUNT(*) as count FROM articles";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ err });
        res.status(200).json({ count: results[0].count });
    });
});

// GET - Articles with a specific word in the title
router.get("/search/:word", (req, res) => {
    const word = req.params.word;
    if (!word || typeof word !== "string") {
        return res.status(400).json({ error: "Search word must be a valid string" });
    }

    const sql = "SELECT * FROM articles WHERE title LIKE ?";
    db.query(sql, [`%${word}%`], (err, results) => {
        if (err) return res.status(500).json({ err });
        if (results.length === 0) return res.status(404).json({ error: "No articles found with this word in the title" });
        res.status(200).json(results);
    });
});

// GET - Distinct authors
router.get("/distinct/authors", (req, res) => {
    const sql = "SELECT DISTINCT author FROM articles";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ err });
        res.status(200).json(results);
    });
});

// GET - Article by ID (this must come last)
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid article ID" });

    const sql = "SELECT * FROM articles WHERE id = ?";
    db.query(sql, id, (err, results) => {
        if (err) return res.status(500).json({ err });
        if (results.length === 0) return res.status(404).json({ error: "Article not found" });
        res.status(200).json(results[0]);
    });
});

// DELETE - Article by ID
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid article ID" });

    const sql = "DELETE FROM articles WHERE id = ?";
    db.query(sql, id, (err, results) => {
        if (err) return res.status(500).json({ err });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Article not found" });
        res.status(200).json({ message: "Article deleted" });
    });
});

module.exports = router;
