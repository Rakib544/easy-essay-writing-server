const mongoose = require("mongoose");

const FaqQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FaqQuestion", FaqQuestionSchema);
