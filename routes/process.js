const router = require("express").Router();
const OurProcessInfo = require("../models/OurPrecossInfo");

router.post("/post", async (req, res) => {
  try {
    const newPost = new OurProcessInfo(req.body);
    const data = await newPost.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/title/:id", async (req, res) => {
  try {
    await BannerInfo.OurProcessInfo(
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

router.put("/update/headerDetails/:id", async (req, res) => {
  try {
    await BannerInfo.OurProcessInfo(
      { _id: req.params.id },
      {
        $set: {
          content: req.body.headerDetails,
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
