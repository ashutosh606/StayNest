const User = require("../models/user.js");

module.exports.renderSignUpForm = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);  // Fix typo (registeredUser instead of registerdUser)
        console.log(registeredUser);

        // Automatically log in the user after registration
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);  // Pass error to error handler
            }
            req.flash("success", "Welcome to StayNest!");  // Corrected message
            return res.redirect("/listings");  // Ensure response is sent only once
        });
        
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}
module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to StayNest!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);  // Pass error to next middleware
        }
        req.flash("success", "You are logged out now.");
        res.redirect("/listings");
    });
};