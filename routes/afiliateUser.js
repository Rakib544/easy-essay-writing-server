const router = require("express").Router();
const AffiliateUser = require("../models/AffiliateUser");

router.post("/all", async (req, res) => {
  try {
    const email = req.body.email;
    const users = await AffiliateUser.find({ referredBy: email });
    res.status(200).json({ allUsers: users.length });
  } catch (err) {
    res.json(err);
  }
});

router.post("/affiliateUserFind", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await AffiliateUser.find({ email: email });
    res.status(200).json({ referredBy: user[0].referredBy });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/lastSevenDays", async (req, res) => {
  const startDate = new Date();
  const lastDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);

  try {
    const email = req.body.email;
    const lastSevenDaysUser = await AffiliateUser.find({
      referredBy: email,
      accountCreatedAt: {
        $gte: new Date(new Date(lastDate).setHours(00, 00, 00)),
        $lt: new Date(new Date(startDate).setHours(23, 59, 59)),
      },
    });
    res.status(200).json({ lastSevenDaysUser: lastSevenDaysUser.length });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/lastOneDay", async (req, res) => {
  const startDate = new Date();
  try {
    const email = req.body.email;
    const lastOneDayUser = await AffiliateUser.find({
      referredBy: email,
      accountCreatedAt: {
        $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
        $lt: new Date(new Date(startDate).setHours(23, 59, 59)),
      },
    });
    res.status(200).json({ lastOneDayUser: lastOneDayUser.length });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post(
  "/allAffiliateUsers",
  getPaginatedResults(AffiliateUser),
  async (req, res) => {
    res.status(200).json(res.paginatedResults);
  }
);

//pagination functionality done
//middleware
function getPaginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.body.page);
    const limit = 10;

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
      const total = await model.find({});
      results.totalData = total.length;
      results.result = await model
        .find({})
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

router.put("/updateBalance", async (req, res) => {
  try {
    const balance = req.body.balance;
    const email = req.body.email;
    await AffiliateUser.findByIdAndUpdate(
      { referredBy: email },
      {
        $set: {
          balance: balance,
        },
      },
      {
        useFindAndModify: false,
      }
    );
    res.status(200).json("Total Amount Updated Successfully");
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/getTotalBalance/:email", async (req, res) => {
  try {
    const user = await AffiliateUser.find({ referredBy: req.params.email });
    const balance = user[0].balance;
    res.status(200).json(balance);
  } catch (err) {
    res.status(404).json(err);
  }
});
module.exports = router;
