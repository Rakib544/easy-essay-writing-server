const mongoose = require("mongoose");

const FooterIconsSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FooterIcons", FooterIconsSchema);
