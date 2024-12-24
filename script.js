const http = require('http');
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'website/index.html');

let html = fs.readFileSync(dirPath, 'utf-8');

const server = http.createServer((req, res) => {
  // handle incoming requests 
  console.log(req);
  //write http header
  res.setHeader('Content-Type', 'text/html');
  
  html.replace({}, 'My website');
  //write html file and returns its content
  res.end(html);
}); 

server.listen(4000, () => {
  console.log('Server running at http://localhost:4000/');
});

