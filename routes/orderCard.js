const router = require("express").Router();
const OrderCard = require("../models/OrderCard");

router.post(
  "/pending",
  getPaginatedResults(OrderCard, "Work In Progress"),
  async (req, res) => {
    res.status(200).json(res.paginatedResults);
  }
);

router.post(
  "/completed",
  getPaginatedResults(OrderCard, "Completed"),
  async (req, res) => {
    res.status(200).json(res.paginatedResults);
  }
);

router.post("/userOrder", async (req, res) => {
  try {
    const userOrder = await OrderCard.find({ customerEmail: req.body.email });
    res.status(200).json(userOrder);
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

//middleware
function getPaginatedResults(model, orderStatus) {
  return async (req, res, next) => {
    const page = parseInt(req.body.page);
    const limit = 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      const total = await model.find({ orderStatus: orderStatus });
      results.totalData = total.length;
      results.result = await model
        .find({ orderStatus: orderStatus })
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

module.exports = router;
