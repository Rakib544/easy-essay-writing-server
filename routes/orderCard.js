const router = require("express").Router();
const OrderCard = require("../models/BannerInfo");

// router.get("/", async (req, res) => {
//   try {
//     const post = await OrderCard.find({});
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(404).json(err);
//   }
// });

router.post("/post", async (req, res) => {
  try {
    const newPost = new OrderCard(req.body);
    const data = await newPost.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/abc/:id", async (req, res) => {
  try {
    await OrderCard.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
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

router.put("/headerDetails/:id", async (req, res) => {
  try {
    await OrderCard.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          headerDetails: req.body.headerDetails,
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
