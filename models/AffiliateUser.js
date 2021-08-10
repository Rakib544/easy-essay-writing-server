const mongoose = require("mongoose");

const AffiliateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  referredBy: {
    type: String,
    required: true,
  },
  accountCreatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("AffiliateUsers", AffiliateSchema);
