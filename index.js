const express = require("express");
const path = require("path");
const URL = require("./models/url");
const staticRouter = require("./routes/staticRouter");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");

const { connectMongoDb } = require("./connectMongo");

const urlRoute = require("./routes/url");

const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT;
console.log("PORT", PORT);

// connection
// connectMongoDb("mongodb://localhost:27017/short-url")
//   .then(() => console.log("connected to mongoDb"))
//   .catch(() => console.log("error in mongoDb connection"));

const url = process.env.DB_URL;
console.log(url);
connectMongoDb(url)
  .then(() => console.log("connected to mongoDb"))
  .catch(() => console.log("error in mongoDb connection"));

app.set("view engine", "ejs"); //for ejs
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/test", async (req, res) => {
//   const allURLS = await URL.find({});
//   return res.render("home", {
//     urls: allURLS,f
//   });
// });
app.use("/", staticRouter);
app.use("/url", urlRoute);
app.use("/user", user);

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));
