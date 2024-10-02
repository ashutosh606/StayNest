const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Utilities and Middlewares
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

// Controllers
const listingController = require("../controllers/listings.js");

// Models
const Listing = require("../models/listing.js");

// Routes

// INDEX & CREATE ROUTES
router
  .route("/")
  // GET - Fetch all listings (Index Route)
  .get(wrapAsync(listingController.index))
  
  // POST - Create a new listing with image upload (Create Route)
  .post(
    isLoggedIn,                    // User must be logged in
    upload.single("listing[image]"), // Handle image upload
    validateListing,               // Validate listing input
    wrapAsync(listingController.createListing)
  );

// NEW LISTING FORM ROUTE
// GET - Render form for creating a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW, UPDATE & DELETE ROUTES
router
  .route("/:id")
  
  // GET - Show a specific listing (Show Route)
  .get(wrapAsync(listingController.showListing))
  
  // PUT - Update an existing listing with image upload (Update Route)
  .put(
    isLoggedIn,                    // User must be logged in
    isOwner,                       // User must be the owner of the listing
    upload.single("listing[image]"), // Handle image upload
    validateListing,               // Validate updated listing input
    wrapAsync(listingController.updateListing)
  )
  
  // DELETE - Remove an existing listing (Delete Route)
  .delete(
    isLoggedIn,                    // User must be logged in
    isOwner,                       // User must be the owner of the listing
    wrapAsync(listingController.deleteListings)
  );

// EDIT LISTING FORM ROUTE
// GET - Render form for editing a specific listing (Edit Route)
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;
