const mongoose = require("mongoose");

const BannerInfoSchema = new mongoose.Schema(
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
  { timeStamps: true }
);

module.exports = mongoose.model("bannerInfo", BannerInfoSchema);
