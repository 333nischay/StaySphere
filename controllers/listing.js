const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
  };

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path: 'review',populate: {path: 'author'}}).populate("owner"); //this is to nested populate and to populate author in review
    if(!listing){
      req.flash("error","The listing you are trying to access is not available!");
      res.redirect("/listings");
    }
    const allListingReviews = listing.review;
    res.render("show.ejs", { listing , allListingReviews});
  };  

  module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    console.log(newListing);
    await newListing.save();
    req.flash("success","New listing is added!");
    res.redirect("/listings");
  };
  
module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","The listing you are trying to edit is not available!");
      res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/uploads","/uploads/h_300,w_250");
    const categories = Listing.schema.path("category").enumValues;
    res.render("edit.ejs", { listing, originalImageUrl, categories });
  };
  
module.exports.updateListing = async (req, res,next) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //This is the update data. The spread operator (...) is used to copy all properties from req.body.listing into a new object. This new object is then passed to findByIdAndUpdate as the update data.
    
   if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image= {url, filename};
    await listing.save();
   }

    req.flash("success","Listing has been edited!");
    res.redirect(`/listings/${id}`);
  };

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findById(id);
    let deletedReview = deletedListing.review; //removing the reviews of this listing from the review databse
    let deleteResult = await Review.deleteMany({ _id: { $in: deletedReview } });
    console.log(deleteResult);
    await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing has been Deleted!");
    res.redirect("/listings");
  };  