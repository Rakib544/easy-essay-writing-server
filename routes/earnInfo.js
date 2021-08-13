const router = require("express").Router();
const AffiliateEarning = require("../models/AffiliateEarning");

router.post("/all", async (req, res) => {
  try {
    const email = req.body.email;
    const users = await AffiliateEarning.find({ email: email });
    const totalEarning = users.reduce(
      (total, user) => (total += parseInt(user.earn)),
      0
    );
    res.status(200).json({ totalEarning: totalEarning });
  } catch (err) {
    res.json(err);
  }
});

router.post("/lastSevenDays", async (req, res) => {
  const startDate = new Date();
  const lastDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);

  try {
    const email = req.body.email;
    const users = await AffiliateEarning.find({
      email: email,
      createdAt: {
        $gte: new Date(new Date(lastDate).setHours(00, 00, 00)),
        $lt: new Date(new Date(startDate).setHours(23, 59, 59)),
      },
    });
    const totalEarning = users.reduce(
      (total, user) => (total += parseInt(user.earn)),
      0
    );
    res.status(200).json({ lastSevenDaysEarning: totalEarning });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/lastOneDay", async (req, res) => {
  const startDate = new Date();
  try {
    const email = req.body.email;
    const users = await AffiliateEarning.find({
      email: email,
      createdAt: {
        $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
        $lt: new Date(new Date(startDate).setHours(23, 59, 59)),
      },
    });
    const totalEarning = users.reduce(
      (total, user) => (total += parseInt(user.earn)),
      0
    );
    res.status(200).json({ lastOneDayEarning: totalEarning });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
