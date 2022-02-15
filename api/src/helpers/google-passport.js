import { config } from "dotenv";
import passport, { session } from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../database/models/user";

config();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        const user = await User.findOneOrCreate(
          { email, googleId: profile.id },
          {
            email,
            firstName: profile.name.familyName,
            lastName: profile.name.givenName,
            googleId: profile.id,
            profilePhotoURL: profile.photos[0].value,
            role: "Standard",
          }
        );
        return done(null, user, { statusCode: 200 });
      } catch (err) {
        done(err, false);
      }
    }
  )
);

export default passport;
