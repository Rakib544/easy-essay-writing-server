const router = require("express").Router();
const OrderCard = require("../models/OrderCard");

router.get("/pending", async (req, res) => {
  try {
    const post = await OrderCard.find({ orderStatus: "Work In Progress" });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/completed", async (req, res) => {
  try {
    const post = await OrderCard.find({ orderStatus: "Completed" });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const newPost = new OrderCard(req.body);
    const data = await newPost.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/orderStatus/:id", async (req, res) => {
  try {
    await OrderCard.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          orderStatus: req.body.orderStatus,
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
