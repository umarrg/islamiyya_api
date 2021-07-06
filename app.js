const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// require("./connections/connection.mongo")();

const tokenMiddleware =
  require("./middlewares/middleware.token").tokenMiddleware;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://umarabox:secretPass@cluster0.t0h3t.mongodb.net/<aboxcrud>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to the db");
  })
  .catch((err) => {
    console.log("connection failed " + err);
  });

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", payload: "welcome to Islamiyya API" });
});

app.get('/cool', (req, res) => res.send(cool()));

const likeRoute = require("./routes/like")();
app.use("/api/v1/like", likeRoute);

const authRoute = require("./routes/auth")();
app.use("/api/v1/auth", authRoute);

app.use(tokenMiddleware());

const userRoute = require("./routes/users")();
app.use("/api/v1/user", userRoute);

//Admin Route
const adminRoute = require("./routes/route.admin")();
app.use("/api/admin", adminRoute);

app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "",
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 9000;
}

app.listen(port, () => {
  console.log(` server is running successfully `);
});
