//do a production dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoDBStore = require("connect-mongo");
const mongoSanitize = require("express-mongo-sanitize");
const geolib = require("geolib");
const geocoder = require("geocoder");

const Mainpagerouter = require("./routes/mainpage/mainpage");
const userRouter = require("./routes/user/register");
const loginRouter = require("./routes/user/login");
const logoutRouter = require("./routes/user/logout");
const groupsRouter = require("./routes/groups/groups");
const publicacionesRouter = require("./routes/publicaciones/publicaciones");
const profileRouter = require("./routes/user/user");
const adminRouter = require("./routes/user/admin");
const gelleryRouter = require("./routes/gallery/gallery");
const apisRouter = require("./routes/apis/apis");
const notificationsRouter = require("./routes/notifications/notifications");
//const error = require("./routes/error/error");
const User = require("./models/user");
const savedPublications = require("./routes/savedPublications/savedPublications");
//"mongodb://localhost:27017/PFdummy"
//"mongodb://127.0.0.1:27017/PFdummy");
//process.env.DBURL
const dbUrl = "mongodb://127.0.0.1:27017/PFdummy" || process.env.DBURL;
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//connect mondoDB to atlas
// const MongoClient = mongodb.MongoClient;
// const url = process.env.DBURL;
// const dbName = "PFdummy";
// const client = new MongoClient(url, { useNewUrlParser: true });
// client.connect((err) => {
//   if (err) {
//     console.log("Unable to connect to the mongoDB server. Error:", err);
//   } else {
//     console.log("Connection established to", url);
//   }
// });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const secret = process.env.SECRET || "secretsecret";

const sessionConfig = {
  store: MongoDBStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60,
  }),
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    //secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(mongoSanitize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", Mainpagerouter);
app.use("/", userRouter);
app.use("/", loginRouter);
app.use("/", logoutRouter);
app.use("/", groupsRouter);
app.use("/", publicacionesRouter);
app.use("/", profileRouter);
app.use("/", adminRouter);
app.use("/", savedPublications);
app.use("/", gelleryRouter);
app.use("/", notificationsRouter);
app.use("/", apisRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;

  res.status(statusCode || 500).render("main/error/error", {
    message: message,
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server started on port 3000");
});
