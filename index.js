const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
app.use(cors());

//PORT
const PORT = 8080;

//router
const bannerRoute = require("./routes/banner");

//Connecting mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("Connect to mongoDB"))
  .catch((err) => console.log(err));

app.use("/banner", bannerRoute);

app.get("/", (req, res) => {
  res.send(" Bismillah Hello World!!!");
});

app.listen(process.env.PORT || PORT);
