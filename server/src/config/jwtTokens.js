import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/utils.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    //console.log({user});

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    //console.table({accessToken, refreshToken});

    user.refreshToken = refreshToken;
  
    await user.save({ validateBeforeSave: false });
    // console.log({user});
    
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "failed to generate tokens");
  }
};

export default generateAccessAndRefreshTokens;
