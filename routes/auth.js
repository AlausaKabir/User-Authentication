const express = require("express");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
router = express();
const bcrypt = require("bcryptjs");
const validation = require("../routes/validation");
const postRoute = require("../routes/post");

router.post("/register", async (req, res) => {
  try {
    await validation.registerValidation(req.body);

    //Checking if the User already exist in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exist");

    //Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const savedUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    return res.status(201).send({
      savedUser,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    await validation.loginValidation(req.body);

    //Checking if the email exist in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email is wrong");
    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");

    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
