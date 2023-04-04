const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/Users");

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const randomProfileTheme = ["lorelei", "personas", "fun-emoji", "avataaars", "adventurer", "big-ears"]
      const userData = {
        googleId: profile.id,
        username: profile._json.email.split("@")[0],
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile._json.email,
        bio: "",
        profilePic_url: `https://api.dicebear.com/5.x/${randomProfileTheme[Math.floor(Math.random()*randomProfileTheme.length)]}/svg?seed=${profile.id}&backgroundColor=ffffff,b6e3f4&backgroundType=gradientLinear`,
      };
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (user) {
          return done(err, user);
        } else {
          User.create(userData, function (err, user) {
            return done(err, user);
          });
        }
      });
    }
  )
);
