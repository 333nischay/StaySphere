const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { savedUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.get("/", (req, res) => {
  res.render("User/login");
});

router.post("/",savedUrl,passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), wrapAsync(userController.loginUser));

module.exports = router;