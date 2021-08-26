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

router.post("/googleUser", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const referrerBy = req.body.referrerEmail;

  try {
    const adminList = await Admin.find({ email: email });
    if (adminList.length === 0) {
      //find the user from database for checking if the user is exists or not
      const userList = await User.find({ email: email });
      //check if the user is already exists or not.
      if (userList.length === 0) {
        if (referrerBy) {
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
          res.status(200).json(newUser);
        } else {
          const newUser = new User({
            name,
            email,
            userType: "user",
            hasDiscountOffer: false,
          });
          await newUser.save();
          res.status(200).json(newUser);
        }
      } else {
        res.status(200).json(userList[0]);
      }
    } else {
      const userList = await User.find({ email: email });
      if (userList.length === 0) {
        const newUser = new User({
          name,
          email,
          userType: "admin",
          hasDiscountOffer: false,
        });
        await newUser.save();
        res.status(200).json(newUser);
      } else {
        res.status(200).json(userList[0]);
      }
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const promoCode = req.body.promoCode;
    if (promoCode) {
      const user = await User.find({ _id: req.params.id });
      const usedPromoCode = user[0].usedPromoCode;
      await User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            hasDiscountOffer: false,
            usedPromoCode: [...usedPromoCode, promoCode],
          },
        },
        {
          useFindAndModify: false,
        }
      );
      res.status(200).json("User has been Updated Successfully");
    } else {
      await User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            hasDiscountOffer: false,
          },
        },
        {
          useFindAndModify: false,
        }
      );
      res.status(200).json("User has been Updated Successfully");
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/update/promoCode", async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      {
        $set: {
          promoCode: req.body.promoCode,
        },
      },
      {
        useFindAndModify: false,
      }
    );
    res.status(200).json("Promo code added");
  } catch (err) {
    res.status(404).json(err);
  }
});

//promo code check functionality goes here
router.post("/checkPromoCode", async (req, res) => {
  try {
    const promoCode = req.body.promoCode;

    const ownUser = await User.find({ email: req.body.email });
    const checkPromoCode = ownUser[0].usedPromoCode.find(
      (code) => code === promoCode
    );
    if (!checkPromoCode) {
      const user = await User.find({ promoCode: promoCode });
      if (user.length > 0) {
        res.status(200).json(user);
      } else {
        res.json("Wrong Promo Code");
      }
    } else {
      res.json("Already Used this promo Code");
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

//get all paginated users
router.post("/", getPaginatedResults(User), async (req, res) => {
  res.status(200).json(res.paginatedResults);
});

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

module.exports = router;
