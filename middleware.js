const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema } = require("./validationSchema.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema } = require("./reviewValidation.js");

module.exports.userAuthenticate = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; //the originalUrl gives the whole path that sent the request!!
        //the path function gives the relative path // the originalUrl is saved in the  session so that it can be accesed from anywhere
        req.flash("error","Please Login first!");
        res.redirect("/login");
    }
    else next();
}

module.exports.savedUrl = (req,res,next)=>{
    if(req.session.redirectUrl)
    res.locals.redirectUrl = req.session.redirectUrl;

    next();
}

module.exports.isOwner = async(req, res, next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(res.locals.currUser && res.locals.currUser._id.equals(listing.owner)){
     next();
    }
    else{
        req.flash("error","You are not the owner of this listing");
        res.redirect(`/listings/${ id }`);
    }
}

//listing validation
module.exports.validateListing = (req,res,next)=>{  //this is for the third party requests like hoppscotch etc.
    const result = listingSchema.validate(req.body);
    const error = result.error;
    if(error){
      const err = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400,err);
    }
    else{
      next();
    }
  }

//review validation
module.exports.validateReview = (req,res,next)=> {
    let outcome = reviewSchema.validate(req.body);
    let error = outcome.error;
    if(error){
      let errorMessage = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errorMessage);
    }
    else next();
  }

  module.exports.isAuthor = async(req, res, next)=>{ //this is just for the backend protection and api direct calls
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(res.locals.currUser && res.locals.currUser._id.equals(review.author._id)){
     next();
    }
    else{
        req.flash("error","You are not the author of this review!");
        res.redirect(`/listings/${ id }`);
    }
}