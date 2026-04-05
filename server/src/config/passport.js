import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../models/user.model.js";
import generateAccessAndRefreshToken from "../config/jwtTokens.js";
import { isProduction } from "./env.js";

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: isProduction
        ? `${process.env.SERVER}/api/v1/user/google/callback`
        : `http://localhost:${process.env.PORT}/api/v1/user/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      //console.log(profile);
      try {
        const email = profile.emails[0]?.value;
        if (!email) throw Error("email not found");
        let user = await UserModel.findOne({ email });
        if (!user) {
          user = await UserModel.create({
            email,
            password: "",
            authProvider: "google",
            googleId: profile.id,
            name: profile.displayName,
            profilePicture: profile.photos[0]?.value || "",
          });
        }

        user.refreshTokenExpiresAt = new Date(
          Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRY_AT) * 60 * 1000,
        );
        await user.save({ validateBeforeSave: false }); //ok here we are saving

        const { accessToken: jwtaccessToken, refreshToken: jwtrefreshToken } =
          await generateAccessAndRefreshToken(user._id);

        user = user.toObject(); // converting this to object because sending user in req, which czn be later req.user
        user.accessToken = jwtaccessToken;
        user.refreshToken = jwtrefreshToken;

        return cb(null, user);
      } catch (error) {
        console.error("failed to autenticate user", error);
        return cb(error, null);
      }
    },
  ),
);

export default passport;
