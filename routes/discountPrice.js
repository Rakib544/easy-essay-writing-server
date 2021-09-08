const router = require("express").Router();
const DisCountPercentage = require("../models/DiscountPercentage");

router.get("/discountPercentage", async (req, res) => {
  try {
    const discountPercentage = await DisCountPercentage.find({});
    res.status(200).json(discountPercentage[0]);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/updateDiscount/:id", async (req, res) => {
  try {
    const updatedValue = await DisCountPercentage.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          discountPercentage: req.body.discountPercentage,
        },
      },
      {
        useFindAndModify: false,
      }
    );
    
    res.status(200).json(updatedValue);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/add", async (req, res) => {
  const discountPercentage = req.body.discountPercentage;
  try {
    const newDiscount = new DisCountPercentage({
      discountPercentage,
    });
    await newDiscount.save();
    res.status(200).json("created");
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
