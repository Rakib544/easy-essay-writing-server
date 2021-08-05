const router = require("express").Router();
const Admin = require("../models/Admin");

router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const email = req.body.email;
    const user = await Admin.find({ email: email });
    if (user.length === 0) {
      userData.userType = "user";
      res.json(userData);
    } else {
      userData.userType = "admin";
      res.json(userData);
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
