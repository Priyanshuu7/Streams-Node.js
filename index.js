const express = require("express");
const fs = require("fs");
const app = express();
const zlib = require("zlib");
const port = 3000;
const status = require("express-status-monitor");

app.use(status());

fs.createReadStream("./sample.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("./sample.zip"));

app.get("/file", (req, res) => {
  const stream = fs.createReadStream("Sample.txt", "utf-8");
  stream.on("data", (chunk) => {
    res.write(chunk);
  });
  stream.on("end", () => {
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
