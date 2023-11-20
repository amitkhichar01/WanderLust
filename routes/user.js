const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const reviewController = require("../controllers/user.js");

router
    .route("/signup")
    .get(reviewController.renderSignupForm)
    .post(wrapAsync(reviewController.signup));

router
    .route("/login")
    .get(reviewController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        wrapAsync(reviewController.login)
    );

router.get("/logout", reviewController.logout);

module.exports = router;
