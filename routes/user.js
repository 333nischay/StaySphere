const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/user.js");

router.get("/signup", (req, res) => {
  res.render("User/user.ejs");
});

router.post("/signup", wrapAsync(userController.signUpUser));

module.exports = router;