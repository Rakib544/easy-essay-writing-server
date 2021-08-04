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

router.put("/update/deliveryDay/:id", async (req, res) => {
  try {
    await PriceCard.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          deliveryDay: req.body.deliveryDay,
        },
      },
      {
        useFindAndModify: false,
      }
    );
    res.status(200).json("Title Updated Successfully");
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/perPage/:id", async (req, res) => {
  try {
    await PriceCard.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          perPage: req.body.perPage,
        },
      },
      {
        useFindAndModify: false,
      }
    );
    res.status(200).json("Title Updated Successfully");
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/wordPerPage/:id", async (req, res) => {
  try {
    await PriceCard.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          wordPerPage: req.body.wordPerPage,
        },
      },
      {
        useFindAndModify: false,
      }
    );
    res.status(200).json("Title Updated Successfully");
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
