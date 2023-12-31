const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing, checkListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

router.post("/",
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,

    wrapAsync(listingController.createListing)
);

//new rout
router.get("/farm", wrapAsync(listingController.renderFarm));
router.get("/beachfront", wrapAsync(listingController.renderBeachfront));
router.get("/cabin", wrapAsync(listingController.renderCabin));
router.get("/lakefront", wrapAsync(listingController.renderLakefront));

router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get(checkListing, wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
