const express = require("express");
const router = express.Router();
const data = require("../data");

// GET /api/products
router.get("/", (req, res) => {
  res.json({ products: data.products });
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const products = data.products.find((item) => item.id === parseInt(id));
  if (products) res.json(products);
  else res.status(404).json({ message: `Product with ID: ${id} not found` });
});

// POST /api/products
router.post("/", (req, res) => {
  const productData = req.body;
  const prod = data.products.find((item) => item.id === parseInt(productData.id)
  );
  if (prod) res.status(400).json({ messege: "id already exist" });
  else {
    data.products.push(productData);
    res.json({ messege: "product added", products: data.products });
  }
});

//PUT /api/products/:id
router.put('/:id',(req,res) =>{
  const id = req.params.id;
  const productData = req.body;
  const prod = data.products.find((item) => item.id === parseInt(id));
  if(prod){
    prod.name = productData.name;
    prod.price = productData.price;
    res.json({messege:`Product with ID: ${id} updated`,products:data.products})
  }else{
    res.status(404).json({messege:`Product with ID: ${id} not found`})
  }
    
})

//DELETE /api/products/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const prod = data.products.find((item) => item.id === parseInt(id));
  if (prod) {
    data.products.splice(data.products.indexOf(prod), 1);
    res.json({ messege: `Product with ID: ${id} deleted`, products: data.products });
  } else {
    res.status(404).json({ messege: `Product with ID: ${id} not found` });
  }
});

module.exports = router;
