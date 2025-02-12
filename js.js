//Michael Sidoruk , Nadav Sayag
const express = require("express");
const logger = require("./logger");
const app = express();
const port = process.env.PORT || 3000;
const users = {
  users: [
    {
      id: 1,
      name: "Leanne Graham",
      user: "admin",
      email: "CgKk4@example.com",
    },
    {
      id: 2,
      name: "Graham hancock",
      user: "simple",
      email: "grahm@example.com",
    },
    {
      id: 3,
      name: "vlad gogi",
      user: "manager",
      email: "gogi@example.com",
    },
  ],
};

app.use(logger);


app.get("/", (req, res) => {
  res.send("Welcome to home page!");
});

app.get("/public",(req,res)=>{
  res.send("this is a public page")
})

app.use("/admin",(req,res,next)=>{
  const { user } = req.query
  if (user)
  {
    if (user == "admin") 
      next()
    else 
     res.status(403).send("Access denied");
  }
  else
    res.status(403).send("Access denied");
})
app.get("/admin",(req,res)=>{
  res.send("Welcome to admin page")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
