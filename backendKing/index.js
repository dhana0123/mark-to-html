// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const marked = require("marked");
const { WebSocketServer } = require("ws");

const app = express();
app.use(cors());

const wss = new WebSocketServer({ port: 8080, path: "/convert" });

wss.on("connection", function connection(ws) {
  console.log("ws running");
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    const html = marked.parse(data.toString());
    ws.send(html);
  });
});

// const port = 3001;

// app.use(bodyParser.json());

// app.post("/convert", (req, res) => {
//   const { markdown } = req.body;
//   if (!markdown) {
//     return res.status(400).send("No Markdown content provided");
//   }

//   // Convert Markdown to HTML
//   const html = marked.parse(markdown);
//   res.json({ html });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
