const express = require('express')
const path = require('path')
const app = express()
const port =  process.env.PORT || 3000

const products = require('./products.json')
const users = require("./users.json")

app.use(express.static(path.join(__dirname, 'assets')))

app.get("/products",(req,res)=>{
  res.json(products)
})

app.get("/products/:id",(req,res)=>{
  const id = req.params.id
  //const {id} = req.params
  const product = products.find(p => p.id === Number(id))
  if (product)
    res.send(product)
  else
    res.status(404).send("404:product not found")
})

app.get("/users",(req,res)=>{
  const {age} = req.query
  if(age)
  {
    const filtered = users.filter(user => user.age <= age)
    res.send(filtered)
  }
  else  
    res.json(users)
})

//error handler
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'assets', '404.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
