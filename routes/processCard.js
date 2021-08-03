const router = require("express").Router();
const ProcessCardInfo = require("../models/BannerInfo");

router.post("/post", async (req, res) => {
  try {
    const newPost = new ProcessCardInfo(req.body);
    const data = await newPost.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/title/:id", async (req, res) => {
  try {
    await ProcessCardInfo.findByIdAndUpdate(
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

router.put("/update/content/:id", async (req, res) => {
  try {
    await ProcessCardInfo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          headerDetails: req.body.content,
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
