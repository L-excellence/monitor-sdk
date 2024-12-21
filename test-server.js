const http = require("http");

const server = http.createServer((req, res) => {
  // 允许跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  res.writeHead(500, { "Content-Type": "text/plain" });
  res.end("Internal Server Error");
});

server.listen(3000);