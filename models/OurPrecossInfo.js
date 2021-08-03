const mongoose = require("mongoose");

const OurProcessInfoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    headerDetails: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OurProcessInfo", OurProcessInfoSchema);
