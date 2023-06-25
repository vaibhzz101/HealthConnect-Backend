const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");

passport.use(
    new GoogleStrategy(
        {
            clientID: "842656615203-p7fqtg0qkf1lrcbph1rbgfod9ndpvhk7.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL:
            "http://localhost:7890/user/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, cb) {
            let user = {
                name: profile._json.name,
                email: profile._json.email,
                password: uuidv4(),
                avtar: profile._json.picture,
            };
            console.log(user);
            return cb(null, user);
        }
    )
);

module.exports = { passport };
