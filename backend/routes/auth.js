const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
router.post("/signUp", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.json({ code: 0, message: "bad request" });
    }
    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(8),
      null
    );
    await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.json({ code: 1, data: { message: "user registered successfully" } });
  } catch (err) {
    throw err;
    res.json({ code: 0, message: "something went wrong" });
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username },{username :1 , password : 1});
    if (user) {
        const { password, ...profile } = user.toJSON();
      if (bcrypt.compareSync(req.body.password, password)) {
        const token = jwt.sign(
          { id: user._id,},
          config.jwtSecret
          );
          
          res.json({code : 1 , data : {auth:true , token : `Bearer ${token}`,profile}})
      } else {
        throw new Error("Incorrect Password");
      }
    } else {
      throw new Error("user not found");
    }
  } catch (err) {
    res.json({ code: 0, message: err });
  }
});

module.exports = router;
