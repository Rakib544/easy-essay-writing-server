const router = require("express").Router();
const FooterIcons = require("../models/FooterIconsInfo");

router.get("/", async (req, res) => {
  try {
    const post = await FooterIcons.find({});
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const newPost = new FooterIcons(req.body);
    const data = await newPost.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/:id", async (req, res) => {
  const data = await FooterIcons.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        link: req.body.link,
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
