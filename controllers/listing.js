const Listing = require("../models/listing");

module.exports.renderFarm = async (req, res) => {
    const allListings = await Listing.find({ category: "farm" });
    res.render("listings/listing.ejs", { allListings });
};

module.exports.renderBeachfront = async (req, res) => {
    const allListings = await Listing.find({ category: "beachfront" });
    res.render("listings/listing.ejs", { allListings });
};

module.exports.renderCabin = async (req, res) => {
    const allListings = await Listing.find({ category: "cabin" });
    res.render("listings/listing.ejs", { allListings });
};

module.exports.renderLakefront = async (req, res) => {
    const allListings = await Listing.find({ category: "lakefront" });
    res.render("listings/listing.ejs", { allListings });
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    res.render("listings/show.ejs", { listing });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "new listing Created!");
    res.redirect("/");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace(/w=\d+/, "w=100").replace(/q=\d+/, "q=50");
    // originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_200");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing1 = await Listing.findById(id);
    if (!listing1.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You don't have permission to edit");
        return res.redirect(`/listing/${id}`);
    }
    let listing = await Listing.findByIdAndUpdate(id, {
        ...req.body.listing,
    });
    if (req.file && req.file.path) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", " listing Updated!");

    res.redirect(`/listing/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted");

    res.redirect("/");
};
