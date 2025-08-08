import mongoose from "mongoose";
import user from "./userModel.js";

const TokenSchema = new mongoose.Schema({
     user: { 
         type: mongoose.Schema.Types.ObjectId, 
         ref: "user",
         required: true
     },
     verificationToken: {
         type: String,
         default: ""  // Remove required: true
     },
     passwordResetToken: {
         type: String,
         default: ""
     },
     createdAt: {
         type: Date,
         required: true
     },
     expiresAt: {
         type: Date,
         required: true
     }
 });
 const Token = mongoose.model("Token", TokenSchema);
 export default Token;


 //T6APP-FWSFG-YHBU2-HLZA7-DJ6QP