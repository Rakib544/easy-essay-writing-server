const mongoose = require("mongoose");

const DiscountPriceSchema = new mongoose.Schema(
  {
    discountPercentage: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("DiscountPrice", DiscountPriceSchema);
