import { GoogleGenerativeAI } from "@google/generative-ai";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponce.js";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const textToText = asyncHandler(async (req, res) => {

    try {
        
        const { text } = req.body;
        // console.log(text);
        if (!text) throw new ApiError(400, "Please provide text");
    
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
        const prompt = text
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const respo = response.text();
        res.status(200).json(new ApiResponse(200, respo));
    } catch (error) {
        res.status(400).json(new ApiResponse(400, error.message));
    }
});

export { textToText };