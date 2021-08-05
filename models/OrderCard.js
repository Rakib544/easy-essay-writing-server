const mongoose = require("mongoose");

const OrderCardSchema = new mongoose.Schema(
  {
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderStatus: {
      type: String,
      enum: ["Work In Progress", "Completed"],
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    file: {
      type: String,
      default: "",
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    orderAmount: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderCard", OrderCardSchema);
