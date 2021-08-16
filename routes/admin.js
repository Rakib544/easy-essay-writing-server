const router = require("express").Router();
const Admin = require("../models/Admin");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    // const photoURL = req.body.photoURL;

    console.log(email);

    const user = await User.find({ email: email });

    if (user.length > 0) {
      // const userObj = {};
      // userObj.name = user[0].name;
      // userObj.email = user[0].email;
      // userObj._id = user[0]._id;
      // userObj.photoURL = photoURL;
      // userObj.userType = user[0].userType;
      // userObj.hasDiscountOffer = user[0].hasDiscountOffer;

      res.status(200).json(user[0]);
    } else {
      res.json("User Not Found");
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

module.exports = router;
