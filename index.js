const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

//PORT
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || PORT);
