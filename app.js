//Michael Sidoruk , Nadav Sayag

const express = require('express');
const app = express();
const articleRouter = require('./router'); 
const port = 3000;

app.use(express.json());
app.use('/article', articleRouter); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
