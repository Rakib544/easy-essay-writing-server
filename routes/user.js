const router = require("express").Router();
const Admin = require("../models/Admin");
const AffiliateUser = require("../models/AffiliateUser");
const User = require("../models/User");

router.post("/user", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;

  try {
    const adminList = await Admin.find({ email: email });
    if (adminList.length === 0) {
      const newUser = new User({
        name,
        email,
        userType: "user",
        hasDiscountOffer: false,
      });
      await newUser.save();
      res.status(200).json("User Created Successfully");
    } else {
      const newUser = new User({
        name,
        email,
        userType: "admin",
        hasDiscountOffer: false,
      });
      await newUser.save();
      res.status(200).json("User Created as an admin");
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/affiliateUser", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const referrerBy = req.body.referrerEmail;

  try {
    const newUser = new User({
      name,
      email,
      userType: "user",
      hasDiscountOffer: true,
    });
    await newUser.save();

    const newAffiliateUser = new AffiliateUser({
      name,
      email,
      referredBy: referrerBy,
      accountCreatedAt: new Date(),
    });

    await newAffiliateUser.save();

    res.status(200).json("User Created Successfully");
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
