const router = require("express").Router();
const PriceCard = require("../models/PriceCardInfo");

router.get("/", async (req, res) => {
  try {
    const post = await PriceCard.find({});
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const newPost = new PriceCard(req.body);
    const data = await newPost.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/:id", async (req, res) => {
  const data = await PriceCard.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        deliveryDay: req.body.deliveryDay,
        perPage: req.body.perPage,
        wordPerPage: req.body.wordPerPage,
      },
    },
    {
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json(err);
      }
    }
  );
  res.status(200).send(data);
});

module.exports = router;
