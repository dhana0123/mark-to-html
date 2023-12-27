// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const marked = require("marked");

const app = express();
app.use(cors());

const port = 3001;

app.use(bodyParser.json());

app.post("/convert", (req, res) => {
  const { markdown } = req.body;
  if (!markdown) {
    return res.status(400).send("No Markdown content provided");
  }

  // Convert Markdown to HTML
  const html = marked.parse(markdown);
  res.json({ html });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
