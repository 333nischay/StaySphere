const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");

router.get("/trending", async(req, res) => {
const allListings = await Listing.find({});    
res.render("categories/trending.ejs", { allListings });
});

router.get("/rooms", async(req, res) => {
const allListings = await Listing.find({});    
res.render("categories/Rooms.ejs", { allListings });
});

router.get("/iconic-cities", async(req, res) => {
const allListings = await Listing.find({});    
res.render("categories/iconic-cities.ejs", { allListings });
});

router.get("/mountains", async(req, res) => {
const allListings = await Listing.find({});    
res.render("categories/mountains.ejs", { allListings });
});

router.get("/sea-facing", async(req, res) => {
const allListings = await Listing.find({});    
res.render("categories/sea-facing.ejs", { allListings });
});

router.get("/villa", async(req, res) => {
const allListings = await Listing.find({});    
res.render("categories/villa.ejs", { allListings });
});

router.get("/swimming-pool", async(req, res) => {
const allListings = await Listing.find({});    
res.render("categories/swimming-pool.ejs", { allListings });
});

  
router.get("/search", async (req, res) => {
    function capitalizeWords(str) {
      return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    const title = req.query.search;
    const correctTitle = capitalizeWords(title);
    const listing = await Listing.findOne({ title: correctTitle }).populate({path: 'review',populate: {path: 'author'}}).populate("owner");
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }
    const allListingReviews = listing.reviews;
    res.render("show.ejs", { listing, allListingReviews });
  });

module.exports = router;