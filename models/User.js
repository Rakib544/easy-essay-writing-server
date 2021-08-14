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
  hasDiscountOffer: {
    type: Boolean,
    required: true,
  },
  totalBalance: {
    type: String,
    default: "0",
  },
});

module.exports = mongoose.model("User", UserSchema);
