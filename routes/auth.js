import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/verify.js";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Inside auth endpoint");
  res.send("This is auth router");
});

router.get("/test", verifyToken, (req, res) => {
  console.log("Inside auth endpoint");
  res.send("This is auth router");
});

router.post("/signup", async (req, res) => {
  const { email, name, phone, password, friends, groups } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist) {
    console.log(email);
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return res.status(401).json("Something went wrong");
      bcrypt.hash(password, salt, function (err, hash) {
        const newUser = new User({
          email,
          name,
          phone,
          password: hash,
          friends,
          groups,
        });
        newUser.save();

        return res.status(200).json("User created");
      });
    });
    return;
  }
  return res.status(400).json({ err: "User already exists" });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const flag = bcrypt.compareSync(password, user.password);
    if (flag) {
      const token = jwt.sign({ id: user._id }, "sdjflserjpwo9iasvnlakesrj");
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json("Logged in");
    } else {
      return res.status(400).json("wrong credentials");
    }
  }
  return res.status(404).send("User doesn't exist");
});

export default router;
