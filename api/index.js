const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://johamo5905:Alex49mqt20052006@cluster0.wlj99o2.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch((err) => {
    console.log("Error Connecting to MongoDB");
  });

app.listen(port, () => {
  console.log("server is running on port 3000");
});

const User = require("./models/user");
const Post = require("./models/post");

//endpoint to register a user in the backend
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.finOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already register" });
    }

    // create a new user
    const newUser = new User({ name, email, password });

    // generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toSstring("hex");

    // save the user to the backend
    await newUser.save();

    // send the verification email to the user
    sendVerifitcationEmail(newUser.email, newUser.verificationToken);

    res.status(200).json({message: "Registration successful"});
  } catch (error) {
    console.log("error register user", error);
    res.status(500).json({ message: "error registering user" });
  }
});

const sendVerifitcationEmail = async(email, verificationToken) => {
    // create a nodemailer transporter

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"pubopub5@gmail.com",
            pass: "rccb beqo hthp dqzk",
        }
    })
}
