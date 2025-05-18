const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");

const db = dbSingleton.getConnection();


router.get("/", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const query = "SELECT * FROM products WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    console.log(results);
    if (results.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(results[0]);
  });
});

router.post("/", (req, res) => {
  const { name, price } = req.body;

  const query = "INSERT INTO products (name, price) VALUES (?,?)";

  db.query(query, [name, price], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send(err);
    }
    res.json({ message: "products added!", name: result.name });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const query = "UPDATE products SET name =? , price=?  WHERE id=?";
  db.query(query, [name, price, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "products updated!" });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id =?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "products deleted!" });
  });
});
module.exports = router;