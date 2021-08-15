const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
    default: "0",
  },
  hasDiscountOffer: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
