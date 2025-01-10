const express = require("express");
const router = express.Router({mergeParams: true});  //this will also take the params from the url passed
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { userAuthenticate, validateReview, isAuthor } = require("../middleware.js");
const ReviewController = require("../controllers/review.js")

//Post request of a review
router.post("/",userAuthenticate, validateReview,wrapAsync(ReviewController.reviewPost));
  
  //delete request for a review
  router.delete("/:reviewId",userAuthenticate,isAuthor,wrapAsync(ReviewController.deleteReview))

  module.exports = router;