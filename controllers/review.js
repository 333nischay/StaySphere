const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.reviewPost = async(req,res)=>{
    let{ id }= req.params;
    let review = req.body.review;
  
    const newReview = new Review(review);
    newReview.author = req.user._id;
    await newReview.save();
    
    let listing = await Listing.findById(id);
    listing.review.push(newReview);
    
    await listing.save();
    req.flash("success","Review is posted!");
    res.redirect(`/listings/${ id }`);
  
  };

module.exports.deleteReview = async(req,res)=>{
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id,{$pull: { review:reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review has been Deleted!");
    res.redirect(`/listings/${id}`);
}; 