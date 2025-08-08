import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/Auth/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {

    try
    {
        //if user is logged in
        const token = req.cookies.token;
        if(!token){
            // 401 unauthorized
            res.status(401).json({message: "Not authorized, please login"});
        }
       // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // get user details from token -------> exculding password from token
        const user = await User.findById(decoded.id).select("-password");


        // set user in request object
        req.user = user;
        next();
        return;

    }catch(err){
        res.status(401).json({message: "Not authorized, token failed"});
    }
});


// admin middleware

export const adminMiddleWare = asyncHandler(async (req, res, next) => {

    if(req.user && req.user.role ==='admin'){


        // if user is admin move to next middleware

        next();
        return;
    }
       // if not admin , 403 forbidden
        res.status(403).json({message: " Forbidden , Not authorized as an admin"});
    
});  




// creator Middleware


export const creatorMiddleWare = asyncHandler(async (req, res, next) => {
    if (req.user && (req.user.role === 'creator' || req.user.role === 'admin')) {
      next();
      return; // Ensure to return after next()
    }
    res.status(403).json({ message: "Forbidden, Not authorized as a creator or admin" });
  });

// Verified  middleware

export const verifiedMiddleWare = asyncHandler(async (req, res, next) => {
    
    if(req.user && req.user.isVerified){
        // if user is verified move to next middleware
        next();
        //return;
    }
    // if not verified , 403 forbidden
    res.status(403).json({message: " Forbidden , Not verified"});
});

