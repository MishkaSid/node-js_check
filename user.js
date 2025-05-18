const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const bcrypt = require("bcrypt");

const db = dbSingleton.getConnection();


router.get("/", (req, res) => {
  const query = "SELECT * FROM users";
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
  const query = "SELECT * FROM users WHERE id = ?";

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
  const { name, email, password } = req.body;

  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send(err);
    }

    if (results.length > 0) {
      console.log("Email already exists:", results);
      return res.status(400).json({ message: "Email already exists" });
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;

      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) throw err;

        const insertQuery =
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).send(err);
          }

          res.json({ message: "User added!", name });
        });
      });
    });
  });
});


router.put("/:id",(req,res)=>{
  const {id} = req.params;
  const{name , email ,password} = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) throw err;
      const query =
        "UPDATE users SET name =? , email=? , password=? WHERE id=?";
      db.query(query, [name, email, hashedPassword, id], (err, results) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.json({ message: "User updated!" });
      });
    });
  });
})

router.delete('/:id',(req,res)=>{
  const {id} = req.params;
  const query = 'DELETE FROM users WHERE id =?';
  db.query(query,[id],(err,results)=>{
    if(err){
      res.status(500).send(err);
      return;
    }
    res.json({message:'User deleted!'})
  })
})


router.post('/login',(req,res)=>{
  const {email , password} = req.body;

  const checkEmailQuery = "SELECT password FROM users WHERE email = ?";
  db.query(checkEmailQuery,[email],(err,results)=>{
    if(err){
      res.status(500).send(err);
      return;
    }
    if(results.length == 0 ){
      return res.status(400).json({ message: "Excess Denied" });
    }
    bcrypt.compare(password, results[0].password, (err, result) => {
      if (err) throw err;
      if (result) {
        console.log("Password is correct!");
         return res.status(400).json({ message:"Welcome to the Page" });
      } else {
        return res.status(400).json({ message: "Excess Denied" });
      }
    });
  });

})


module.exports = router