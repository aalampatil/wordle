import { ApiError, asyncHandler, ApiResponse } from "../utils/utils.js";
import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import generateAccessAndRefreshTokens from "../config/jwtTokens.js";
import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../routes/user.routes.js";

const verified = asyncHandler(async (req, res) => {
  //console.log(req.user);

  const user = req.user;
  // console.log("user",user);

  if (!user) {
    throw new ApiError(401, {}, "user is not verified");
  }
  return res.status(200).json(new ApiResponse(200, user, "verified user"));
  //always check how you send/recieve data, it can 1.{user} // user spreads in 1 or 2.{user: req.user} //var user holds data
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // console.log("user.js",req.cookies);

  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorised request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_SECRET,
    );

    const user = await UserModel.findById(decodedToken?._id);
    // console.log(user)

    if (!user) {
      throw new ApiError(401, "unauthorised request");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "token expired or used before");
    }

    // console.log("expires at",user.refreshTokenExpiresAt.getTime())
    // console.log("date", Date.now());

    if (user.refreshTokenExpiresAt.getTime() < Number(Date.now())) {
      user.refreshToken = null;
      user.refreshTokenExpiresAt = null;
      await user.save();
      throw new ApiError(401, "session expired login again");
    } else {
      const { accessToken, refreshToken: newRefreshToken } =
        await generateAccessAndRefreshTokens(user._id);

      return res
        .status(200)
        .cookie("accessToken", accessToken, accessCookieOptions)
        .cookie("refreshToken", newRefreshToken, refreshCookieOptions)
        .json(new ApiResponse(200, "", "access token refreshed"));
    }
  } catch (error) {
    throw new ApiError(401, "invalid refresh Token/missing token");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  // console.log(req.user);
  // console.log("logout controller")

  await UserModel.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1, refreshTokenExpiresAt: 1 } },
    // $unset-remove field from document,$set keeps field in document but either as null or ""
    { new: true },
  );

  return res
    .status(200)
    .clearCookie("accessToken", accessCookieOptions)
    .clearCookie("refreshToken", refreshCookieOptions)
    .json(new ApiResponse(200, {}, "logged out successfully"));
});

export { verified, refreshAccessToken, logoutUser };
