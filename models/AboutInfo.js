const mongoose = require("mongoose");

const AboutInfoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    headerDetails: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("aboutInfo", AboutInfoSchema);
