const router = require("express").Router();
const FaqQuestion = require("../models/FaqInfo");

router.get("/", async (req, res) => {
  try {
    const post = await FaqQuestion.find({});
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const newPost = new FaqQuestion(req.body);
    const data = await newPost.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/question/:id", async (req, res) => {
  try {
    await FaqQuestion.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          question: req.body.question,
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

router.put("/update/answer/:id", async (req, res) => {
  try {
    await FaqQuestion.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          answer: req.body.answer,
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
