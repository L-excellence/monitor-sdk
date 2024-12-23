const http = require("http");

const server = http.createServer((req, res) => {
  // 允许跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    // 处理预检请求
    res.writeHead(204);
    res.end();
  } else {
    
    if (req.url.startsWith("/error")) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error, code is 500.");
    } else {
      // 处理正常请求
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello, world!");
    }
  }
});

server.listen(3000, () => console.log("Server running on port 3000"));