const router = require("express").Router();
const AffiliateUser = require("../models/AffiliateUser");

router.post("/", async (req, res) => {
  const startDate = new Date();
  const lastDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  try {
    const email = req.body.email;
    const users = await AffiliateUser.find({ referrerEmail: email });
    const lastSevenDaysUser = await AffiliateUser.find({
      referrerEmail: email,
      accountCreatedAt: {
        $gte: new Date(new Date(lastDate).setHours(00, 00, 00)),
        $lt: new Date(new Date(startDate).setHours(23, 59, 59)),
      },
    });
    const lastOneDayUser = await AffiliateUser.find({
      referrerEmail: email,
      accountCreatedAt: {
        $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
        $lt: new Date(new Date(startDate).setHours(23, 59, 59)),
      },
    });
    const lastOneDaysCreatedUser = lastOneDayUser.length;
    const lastSevenDayCreatedUsers = lastSevenDaysUser.length;
    const allTimeCreatedUsers = users.length;
    res.json({
      lastOneDaysCreatedUser,
      lastSevenDayCreatedUsers,
      allTimeCreatedUsers,
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
