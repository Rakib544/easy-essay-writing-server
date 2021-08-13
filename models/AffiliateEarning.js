const mongoose = require("mongoose");

const AffiliateEarning = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    earn: {
      type: String,
      required: true,
    },
    accountCreatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AffiliateEarning", AffiliateEarning);
