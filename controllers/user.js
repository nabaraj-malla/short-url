const User = require("../models/user");
const { v4: uudiv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");
const { generateNewShortURL } = require("./url");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "Invalid credentials" });
  }

  // const sessionId = uudiv4();
  // setUser(sessionId, user);
  const token = setUser(user);
  // new code
  // const user = getUser(token);
  const result = getUser(token);
  // res.cookie("uid", token);
  res.cookie("uid", result);
  // return res.redirect("/");
  return res.redirect("/");
}

// old

// async function handleUserLogin(req, res) {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email, password });
//   if (!user) {
//     return res.render("login", { error: "Invalid credentials" });
//   }

//   // const sessionId = uudiv4();
//   // setUser(sessionId, user);
//   const token = setUser(user);
//   res.cookie("uid", token);

//   // return res.redirect("/");
//   // return res.send("cdone");
//   return res.redirect("/staticRouter");
// }

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
