const router = require("express").Router();
const ProcessCardInfo = require("../models/BannerInfo");

router.get("/", async (req, res) => {
  try {
    const post = await ProcessCardInfo.find({});
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const newPost = new ProcessCardInfo(req.body);
    const data = await newPost.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/:id", async (req, res) => {
  const data = await ProcessCardInfo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
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
