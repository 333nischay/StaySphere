if(process.env.NODE_ENV != "production") {
  require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const Listings = require("./routes/listing.js");
const Reviews = require("./routes/review.js");
const Users = require("./routes/user.js")
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Login = require("./routes/login.js");
const Logout = require("./routes/logout.js");
const Categories = require("./routes/categories.js")
const MONGO_URL = process.env.ATLAS_MONGODB_URL;


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(cookieParser("secretCode"));

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto:{
    secret: process.env.SECRET
  },
  touchAfter: 24*3600
})

store.on("error",()=>{
  console.log("error in mongo session store", error);
})

const sessionOperators = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: 
//             __ This gives the current time in milliseconds therefore the session is time is added in milliseconds
//            |
  {expires: Date.now() + 7*24*60*60*1000,
   originalMaxAge:7*24*60*60*1000,
   httpOnly:true}
}

app.use(session(sessionOperators)); //passport also uses this session for authorization
app.use(flash());


//initializing and using passport for authentication and serializing and deserializing user's data in the session
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; //the user info is automatically saved by passport when a user is logged in
  next();
})
// app.get("/demoUser",async(req,res)=>{
//   let user = new User({
//     email: "demo@yahoo.com",
//     username: "demogorgan1" //this username is not defined in the userSchema but is automatically added by the passport pulgin
//   });
//   let response = await User.register(user,"hello");
//   res.send(response);
// })

app.get("/home", (req, res) => {
  res.render("home.ejs")
});


app.use("/listings",Listings); //this uses router that is responsible for all listing calls

//Reviews 
app.use("/listings/:id/reviews",Reviews); //this will handle all the review calls

//categories
app.use("/category", Categories); //This will show all the categories


//User SignUp
app.use("/", Users);

//User Login
app.use("/login", Login);

//User Logut
app.use("/logout", Logout);

app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"No page found!"));
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err; //this also extracts message sent from express or mongoose and sends it to the cliet

  res.render("error.ejs",{ message });
  
  // res.status(statusCode).send(message);
});

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});