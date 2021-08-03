const mongoose = require("mongoose");

const PriceCardSchema = new mongoose.Schema(
  {
    deliveryDay: {
      type: String,
      required: true,
    },
    perPage: {
      type: String,
      required: true,
    },
    wordPerPage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PriceCard", PriceCardSchema);
