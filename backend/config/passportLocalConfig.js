const passportSetup = require("../config/passportConfig");
const passport = require("passport");
const User = require("../models/Users");

const initializeSignup = async (userData, password, req, res) => {
  User.register(userData, password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/signup");
    } else {
      passport.authenticate("local", { failureRedirect: "/login" })(
        req,
        res,
        () => {
          res.redirect("/profile");
        }
      );
    }
  });
};

module.exports = initializeSignup;