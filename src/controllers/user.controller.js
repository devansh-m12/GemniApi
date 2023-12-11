import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import users from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponce } from '../utils/ApiResponce.js';

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    // validate user details - not empty
    // check if user exists: username, email
    // chek for images check for avtar
    // uplode them to cloudinary, avtar
    // create user object - create entry in db
    // remove password and refresh tokens from user object
    // check for user creation
    // return response
    const {fullName, username, email, password, avtar} = req.body;
    
    if(
        [fullName, username, email, password, avtar].includes("")
    ){
        throw new ApiError(400, "All fields are required");
    }

    const userExists = await users.findOne({$or: [{username}, {email}]});
    if(userExists){
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = res.files?.avtar[0]?.path
    const coverImageLocalPath = res.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avtar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar upload failed");
    }

    const user = await users.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avtar: avatar.url,
        coverImage: coverImage?.url || "",
    });

    const createdUser = await user.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "something went wrong while registering user");
    }

    return res.status(201).json(new ApiResponce(200, "User registered successfully"));
});


export {registerUser};