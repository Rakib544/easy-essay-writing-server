const mongoose = require("mongoose");

const FooterIconsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FooterIcons", FooterIconsSchema);
