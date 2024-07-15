const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.cookies.uid;
  console.log("user hello", user);
  // if (!req.user) {
  //   console.log("user not found");
  //   return res.redirect("/staticRouter/login");
  // }

  // try below code
  if (!user) {
    console.log("user not found");
    return res.redirect("/login");
  }
  // const allURLS = await URL.find({ createdBy: req.user._id });
  const allURLS = await URL.find({ createdBy: user._id });
  return res.render("home", {
    urls: allURLS,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
