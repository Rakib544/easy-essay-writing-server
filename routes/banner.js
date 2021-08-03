const router = require("express").Router();
const bannerInfo = require("../models/BannerInfo");

router.post("/post", async (req, res) => {
  try {
    console.log(req.body);
    const newPost = new bannerInfo(req.body);
    const data = await newPost.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/title", async (req, res) => {
  try {
    const updatedData = await bannerInfo.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: { title: req.body.title } }
    );
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/headerDetails", async (req, res) => {
  try {
    await BannerInfo.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: { title: req.body.headerDetails } }
    );
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
