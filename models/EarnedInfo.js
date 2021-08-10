const mongoose = require("mongoose");

const EarnedInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  earnedMoney: {
    type: String,
    required: true,
  },
  earnedAt: {
    type: Date,
    default: new Date().getDate(),
  },
});

module.exports = mongoose.model("EarnedInfo", EarnedInfoSchema);
