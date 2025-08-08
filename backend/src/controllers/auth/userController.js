
import asyncHandler from 'express-async-handler';
import user from '../../models/Auth/userModel.js';
import { generateToken } from '../../helpers/WebToken.js';
import bycrypt, { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import e from 'express';
import Token from '../../models/Auth/Token.js';
import crypto from 'node:crypto';
import hashToken from '../../helpers/hashToken.js';
import sendEmail from '../../helpers/sendEmial.js';




export  const RegisterUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    
 //Validation
 if(!name || !email || !password){
    //bad request
     res.status(400).json({message: "All fields are required"});
    }
    

    //check password length 
    if(password.length < 6){
       return  res.status(400).json({message: "Password must be at least 6 characters"});
    }
    // check if user is already exists
    const userExists = await user.findOne({email});
    
    if(userExists){
        //bad request
        return res.status(400).json({message: "User already exists"});
    
    }
    //create new user
    const User = await user.create({
        name,
        email,
        password
    });

    // generate user token with user id
    const token = generateToken(user._id);

    //send back user and token in response to client
     res.cookie("token", token, {
        path:"/",
        httpOnly: true,
        maxAge:30* 24* 60* 1000, //30 days
        sameSite:true,
        secure:true,

      });

    // console.log("token", token);
    
    

  if(User){
    const {_id, name, email, role , photo, bio , isVerified  } = User;
      // 201 created
      res.status(201).json({ _id, name, email, role , photo, bio , isVerified , token});


  }else{
    res.status(400).json({message: "Invalid user data"});
  }


    //encrypt password before saving to db

    
    
    
}); 


//Login User

export const  LoginUser = asyncHandler(async (req, res) => {

    //get data from request body
    const {email, password} = req.body;
    //Validation
    if(!email || !password){
        // 404 bad request
         res.status(400).json({message: "All fields are required"});
        }
    //check if user exists
    const userExists = await user.findOne({email});

    //if user does not exists
    if(!userExists){
        //404 not found
        return res.status(404).json({message: "User does not exists , sighn Up"});
    }
        //check if password is correct (is password matches with the hashed password in db)
        const isMatch = await bycrypt.compare(password, userExists.password);
        //if password does not match
        if(!isMatch){
            //404 unauthorized
            return res.status(404).json({message: "Invalid credentials"});
        }

        //generate token with user id
        const token = generateToken(userExists._id);

        if(userExists && isMatch){
            const {_id, name, email, role , photo, bio , isVerified  } = userExists;

              // set the token in cookie
                res.cookie("token", token, { 
                    path:"/",
                    httpOnly: true, 
                    maxAge:30* 24* 60* 1000, //30 days
                    sameSite:true,
                    secure:true,
                });


              // send back user and token in response to client
              res.status(200).json({
                success: true,
                user: { _id, name, email, role, photo, bio, isVerified },
                token
              });

        
        
          }else{
            res.status(400).json({message: "Invalid email or password "});
          }
        
});

//Logout User
export const LogoutUser = asyncHandler(async (req, res) => {
    // Clear the "token" cookie
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  });


//Get User 

export const GetUser = asyncHandler(async (req, res) => {
// Get user details from request object excluding password
const User= await user.findById(req.user._id).select("-password");
if(User){
    res.status(200).json(User);
}
// user not found 
else{
    res.status(404).json({message: "User not found"});}


});

// update user
  export const UpdateUser = asyncHandler(async (req, res) => {
    // Get user details from request object excluding password
    const User = await  user.findById(req.user._id);
    if(User){
        const {name,photo, bio} = req.body;
        // update user details
        User.name=req.body.name || User.name;
        User.photo=req.body.photo || User.photo;
        User.bio=req.body.bio || User.bio;

        //saving updated uder 
        const updated=  await User.save();

        res.status(200).json({
            _id: updated._id,
            name: updated.name,
            email: updated.email,
            role: updated.role,
            photo: updated.photo,
            bio: updated.bio,
            isVerified: updated.isVerified,

        })

    }
    // user not found 
    else{
        res.status(404).json({message: "User not found"});}
    
    
    });

    // checking user login status

    export const userLoginStatus = asyncHandler(async (req, res) => {

      const token = req.cookies.token;
      if(!token){
          res.status(401).json({message: "not authorized , please login"});}

          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          if(decoded){
              res.status(200).json(true);
          }else{
              res.status(401).json(false);
          }



    });


    // email verification 
    export const VerifyEmail = asyncHandler(async (req, res) => {

      const User = await user.findById(req.user._id);
      if(!User){
          res.status(404).json({message: "User not found"});
      }

      // if user is already verified
      if(User.isVerified){
          res.status(400).json({message: "User already verified"});

      }


      const token= Token.findOne({userId: User._id});

      // if user have token already

      if(token){
          await token.deleteOne();
      }

  // creating a new vefication token by using user Id ------> Crypto

  const verificationToken=  crypto.randomBytes(64).toString("hex")+User._id;

  // hash verification token

  const hashedToken=  await hashToken(verificationToken);

  // create new token in db
  await new Token ({
      user: User._id,
      verificationToken: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24*60*60*1000, // 24 hours
  }).save();

  // create verifcation link 

  ////sdjcdjcdcjhdbcjcv   -----> this can cause problem so beware 
  // ------------------------>>>>>>>>>>>>>>>>>>>>>
  const encodedToken = encodeURIComponent(verificationToken); // 👈 URL-safe encoding
  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${encodedToken}`;



  //send email
const subject = "Email Verification - AuthKit";
const send_to = User.email;
const reply_to= "noreply@gmail.com";
const template="emailVerification";
//const send_from=process.env.USER_EMAIL;
const name=User.name;
const link=verificationLink;

try {
  await sendEmail({
    subject: "Email Verification - AuthKit",
    send_to: User.email,
    reply_to: "noreply@gmail.com",
    template: "emailVerification",
    context: {
      name: User.name,
      link: verificationLink,
      companyName: "Your App Name"
    }
  });
  res.status(200).json({ message: "Email sent successfully" });
} catch (error) {
  console.log("Error in sending Email:", error);
  res.status(500).json({ message: "Email could not be sent" });
}
});




    // verify User Function 
    export const VerifyUser = asyncHandler(async (req, res) => {

      
       const {verificationToken} = req.params;
       console.log(verificationToken);
       console.log("i am usser ");
       if(!verificationToken){
           res.status(400).json({message: "Invalid verification token"});
       }



       //yfyvvvu

     //  const decodedToken = decodeURIComponent(verificationToken); // 👈 Decode first
  const hashedToken = await hashToken(verificationToken);
  
       const userToken = await Token.findOne({verificationToken: hashedToken , 
          // checking if token is not expired yet

       expiresAt: {$gt: Date.now()},
       });

     
      //console.log("userToken", userToken);

      if(!userToken){
        res.status(400).json({message: "user token not found"});
      }

      const User=await user.findById(userToken.user);
       // if user is already verified

       if(User.isVerified){
        // 400 bad request

        res.status(400).json({message: "user is alreaady verified"});
       }

       // verify the user

       User.isVerified=true;
       await User.save();
       res.status(200).json({message: "User Verified"})

 


       
      
    });


    //  Forgot Password

    export const ForgotPassword = asyncHandler(async (req, res) => {
      try {
          const { email } = req.body;
          
          if (!email) {
              return res.status(400).json({ message: "Email is required" });
          }
  
          const User = await user.findOne({ email });
          if (!User) {
              return res.status(404).json({ message: "User not found" });
          }
  
          // Delete existing tokens
          await Token.deleteMany({ user: User._id });
  
          // Generate reset token
          const PasswordResetToken = crypto.randomBytes(64).toString("hex");
          const hashedToken = await hashToken(PasswordResetToken);
  
          // Create new token with passwordResetToken only
          await new Token({
              user: User._id,
              passwordResetToken: hashedToken,
              createdAt: Date.now(),
              expiresAt: Date.now() + 60*60*1000
          }).save();
  
          const encodedToken = encodeURIComponent(PasswordResetToken);
          const resetLink = `${process.env.CLIENT_URL}/reset-password/${encodedToken}`;
  
          // Send email
          await sendEmail({
              subject: "Forgot Password - AuthKit",
              send_to: User.email,
              reply_to: "noreply@gmail.com",
              template: "forgotpassword",
              context: {
                  name: User.name,
                  resetLink: resetLink,
                  companyName: "Your App Name"
              }
          });
  
          res.status(200).json({ message: "Email sent successfully" });
  
      } catch (error) {
          console.error("Forgot password error:", error);
          res.status(500).json({ 
              message: "Server error",
              error: error.message 
          });
      }
  });
     
    



    // rset password function



    export const resetpassword = asyncHandler(async (req, res) => {
      try {
          const { resetPasswordToken } = req.params;
          
          if (!req.body.password) {
              return res.status(400).json({ message: "Password is required" });
          }
  
          const decodedToken = decodeURIComponent(resetPasswordToken);
          const hashedToken = await hashToken(decodedToken);
  
          // Find by passwordResetToken instead of verificationToken
          const userToken = await Token.findOne({
              passwordResetToken: hashedToken,
              expiresAt: { $gt: Date.now() }
          });
  
          if (!userToken) {
              return res.status(400).json({ message: "Invalid or expired token" });
          }
  
          const User = await user.findById(userToken.user);
          if (!User) {
              return res.status(404).json({ message: "User not found" });
          }
  
          // Update password
          User.password = req.body.password;
          await User.save();
  
          // Delete used token
          await Token.deleteOne({ _id: userToken._id });
  
          res.status(200).json({ message: "Password reset successful" });
  
      } catch (error) {
          console.error("Reset password error:", error);
          res.status(500).json({
              message: "Server error",
              error: error.message
          });
      }
  });


    // change password function

 export const changePassword = asyncHandler(async(req,res)=>{
  
    //res.status(200).json({message:"change password route is hit"})
 const {currentPassword , newPassword } = req.body;

 if(!currentPassword || !newPassword){
  res.status(400).json({message:" All fields are required --->"});
 }
 // find user by id 
 const User= await user.findById(req.user._id);

 //   compare current password with  saved password in db 

 const isMatch= await bycrypt.compare(currentPassword , User.password);
  
 // if password does not match 
 if(!isMatch){
  res.status(400).json({message:"Invalid Password --> (Current password does not the saved password)"});
 }
 if(isMatch){
 User.password = newPassword;
 await User.save();
  res.status(200).json({message: "Password changed Successfully"});

 }
 else{
  res.status(400).json({message: "Password can not be changed"});
 
 }





  });
  