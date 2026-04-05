import { Router } from "express";
import passport from "passport";
import { logoutUser, refreshAccessToken, verified } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isProduction } from "../config/env.js";

const userRouter = Router();

export const accessCookieOptions = {
  httpOnly: true,
  secure: isProduction ? true : false, // true in production
  sameSite: isProduction ? "none" : "lax",
  maxAge: 1 * 60 * 1000, // 5 minutes
  path: "/",
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction ? true : false,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 30 * 60 * 1000, // 30 min
  path: "/",
  
};

userRouter
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

userRouter.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: isProduction ? `${process.env.CLIENT}/login`: "http://localhost:5173/login",
    session: false,
  }),
  (req, res) => {
    const { accessToken, refreshToken } = req.user;
    res
      .cookie("accessToken", accessToken, accessCookieOptions)
      .cookie("refreshToken", refreshToken, refreshCookieOptions);
    if (isProduction) {
      res.redirect(process.env.CLIENT);
    } else {
      res.redirect("http://localhost:5173/");
    }
  }
);

userRouter.route("/verified").get(verifyJWT, verified);
userRouter.route("/refresh-tokens").post(refreshAccessToken);
userRouter.route("/logout").post(verifyJWT, logoutUser)

export default userRouter;
