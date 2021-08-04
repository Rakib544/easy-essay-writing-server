const router = require("express").Router();
const aboutInfo = require("../models/AboutInfo");

router.get("/", async (req, res) => {
  try {
    const post = await aboutInfo.find({});
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const newPost = new aboutInfo(req.body);
    const data = await newPost.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/:id", async (req, res) => {

  const data = await aboutInfo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        headerDetails: req.body.headerDetails,
        buttonText: req.body.buttonText,
      },
    },
    {
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json()
      }
    }
  );
  res.status(200).send(data);
});

module.exports = router;
