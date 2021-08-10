const router = require("express").Router();
const Admin = require("../models/Admin");
const User = require("../models/User");
const AffiliateUser = require("../models/AffiliateUser");

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const photoURL = req.body.photoURL;
    const referrerEmail = req.body.referrerEmail;

    const isAdminList = await Admin.find({ email: email });

    if (isAdminList.length === 0) {
      const isUser = await User.find({ email: email });
      if (isUser.length === 0) {
        if (referrerEmail) {
          const newUser = new User({
            name,
            email,
            userType: "user",
            hasDiscountOffer: true,
          });
          const user = await newUser.save();
          const userObj = formateUser(
            user.name,
            user.email,
            user.userType,
            user._id,
            user.hasDiscountOffer,
            photoURL
          );
          const affiliateUser = new AffiliateUser({
            name,
            email,
            referredBy: referrerEmail,
          });
          await affiliateUser.save();
          res.send({ userObj, affiliateUser });
        } else {
          const newUser = new User({
            name,
            email,
            userType: "user",
            hasDiscountOffer: false,
          });
          const user = await newUser.save();
          const userObj = formateUser(
            user.name,
            user.email,
            user.userType,
            user._id,
            user.hasDiscountOffer,
            photoURL
          );
          res.send(userObj);
        }
      } else {
        const userObj = {};
        userObj.username = isUser[0].name;
        userObj.userEmail = isUser[0].email;
        userObj.userType = isUser[0].userType;
        userObj._id = isUser[0]._id;
        userObj.photoURL = photoURL;
        userObj.hasDiscountOffer = user[0].hasDiscountOffer;
        res.send(userObj);
      }
    } else {
      const isUser = await User.find({ email: email });
      if (isUser.length === 0) {
        const newUser = new User({
          name,
          email,
          userType: "admin",
          hasDiscountOffer: false,
        });
        const user = await newUser.save();
        const userObj = {};
        userObj.username = user.name;
        userObj.userEmail = user.email;
        userObj.userType = user.userType;
        userObj._id = user._id;
        userObj.photoURL = photoURL;
        res.send(userObj);
      } else {
        const userObj = {};
        userObj.username = isUser[0].name;
        userObj.userEmail = isUser[0].email;
        userObj.userType = isUser[0].userType;
        userObj._id = isUser[0]._id;
        userObj.photoURL = photoURL;
        res.send(userObj);
      }
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

//referrer url checking
router.get("/checkURL/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.find({ _id: id });

    if (user.length === 0) {
      res.json("Wrong Referrer URL");
    } else {
      const email = user[0].email;
      res.json({ referrerEmail: email });
    }
  } catch (err) {
    res.json("Wrong referrer URL ");
  }
});

// add admin route functionality
router.post("/addAdmin", async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const data = await newAdmin.save();

    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

const formateUser = (name, email, userType, id, discountOffer, photoURL) => {
  const userObj = {};
  userObj.username = name;
  userObj.userEmail = email;
  userObj.userType = userType;
  userObj._id = id;
  userObj.hasDiscountOffer = discountOffer;
  userObj.photoURL = photoURL;
  return userObj;
};

module.exports = router;
