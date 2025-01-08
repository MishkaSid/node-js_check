const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

// יצירת שרת
const server = http.createServer(function (req, res) {
  // ניתוח ה-URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathname === "/") {
    // קריאת קובץ HTML מהתיקייה templates
    const filePath = path.join(__dirname, "templates", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err.message);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Server Error: Could not read the file</h1>");
        return;
      }

      // החלפת התבנית {{name}} בשם שהתקבל ב-query
      const name = query.name || "Guest";
      const personalizedContent = data.replace("{{name}}", name);

      // שליחת התוכן ללקוח
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(personalizedContent);
    });
  } else if (pathname === "/about" || pathname === "/contact") {
    const fileName = pathname === "/about" ? "about.html" : "contact.html";
    const filePath = path.join(__dirname, "templates", fileName);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err.message);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Server Error: Could not read the file</h1>");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    // טיפול בדפים שאינם קיימים
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
});

// הפעלת השרת
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
