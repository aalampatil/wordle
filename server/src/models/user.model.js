import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      select: false, // 🔐 never return password by default
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "google",
    },
    googleId: {
      type: String,
      index: true,
    },
    name: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    refreshTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      authProvider: this.authProvider,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      tokenVersion: this.refreshTokenVersion,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema); //mongoose.models.User caches any available instance instead of creating another

  