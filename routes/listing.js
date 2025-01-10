const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { userAuthenticate, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listing.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage });
const Listing = require("../models/listing.js");


  //Index Route
  //create route
  router.route("/")
  .get(wrapAsync(ListingController.index))
  .post( 
    userAuthenticate,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(ListingController.createListing)
    // res.send(req.file); //file is in the place of req.body sice we are using multipart parsing
  );
  
  //New Route
  router.get("/new",userAuthenticate, (req, res) => { 
    const categories = Listing.schema.path('category').enumValues;
    res.render("new.ejs", { categories }); 
  });

  //showing, deleting and editing the listing
  router.route("/:id")
  .get( wrapAsync(ListingController.showListing))
  .put(userAuthenticate,isOwner,upload.single('listing[image]'), validateListing, wrapAsync(ListingController.updateListing))
  .delete(userAuthenticate,isOwner, wrapAsync(ListingController.deleteListing));
  
  //Edit Route
  router.get("/:id/edit",userAuthenticate,isOwner, wrapAsync(ListingController.editListing));

  module.exports = router;