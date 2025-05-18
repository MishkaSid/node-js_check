const express = require("express");
const app = express();
const usersRoutes = require("./routes/user")
const productsRoutes = require('./routes/products')
const port = 3000;
const logger = require('./logger')

app.use(logger);
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
