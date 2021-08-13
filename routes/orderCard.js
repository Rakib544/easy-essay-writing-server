const router = require("express").Router();
const OrderCard = require("../models/OrderCard");
const AffiliateEarning = require("../models/AffiliateEarning");

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
    const userOrder = await OrderCard.find({
      customerEmail: req.body.email,
    }).sort({ orderDate: -1 });
    res.status(200).json(userOrder);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/post", async (req, res) => {
  const referredBy = req.body.referredBy;
  const earn = req.body.referredUserProfit;
  try {
    const newPost = new OrderCard(req.body);
    await newPost.save();
    if (referredBy) {
      const newUser = new AffiliateEarning({
        email: referredBy,
        earn,
      });
      await newUser.save();
    }

    res.status(200).json("Order added Successful");
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
        .sort({ orderDate: -1 })
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

router.put("/upload/:id", async (req, res) => {
  const file = req.files.file;
  const filePath = `/${file.name}`;
  file.mv(`${__dirname}/../uploads/${file.name}`, async (err) => {
    if (err) {
      return res.json(err);
    }
    return res.json(filePath);
  });
  await OrderCard.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        file: filePath,
      },
    },
    {
      useFindAndModify: false,
    }
  );
  res.json("Completed");
});

module.exports = router;
