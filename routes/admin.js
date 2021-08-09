const router = require("express").Router();
const Admin = require("../models/Admin");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const email = req.body.email;
    const name = req.body.name;
    const user = await Admin.find({ email: email });
    if (user.length === 0) {
      const isUser = await User.find({ email: email });
      if (isUser.length === 0) {
        const newUser = new User({ email, name, userType: "user" });
        const user = await newUser.save();
        const object = { ...user };
        object.photoURL = userData.photoURL;
        res.json(object);
      } else {
        const object = { ...isUser };
        object.photoURL = userData.photoURL;
        res.json(object);
      }
    } else {
      res.send("Follow");
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

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
