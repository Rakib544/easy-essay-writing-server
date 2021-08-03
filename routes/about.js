const router = require("express").Router();
const aboutInfo = require("../models/AboutInfo");

router.post("/post", async (req, res) => {
  try {
    const newPost = new aboutInfo(req.body);
    const data = await newPost.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/title/:id", async (req, res) => {
  try {
    await BannerInfo.findByIdAndUpdate(
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

router.put("/update/headerDetails", async (req, res) => {
  try {
    await BannerInfo.findByIdAndUpdate(
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

router.put("/update/buttonText", async (req, res) => {
  try {
    await BannerInfo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          headerDetails: req.body.buttonText,
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
