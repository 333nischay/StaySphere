const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");
const userController = require("../controllers/user.js");

router.get("/", userController.logoutUser);

module.exports = router;