// routes.js
import express from "express";
import { 
  LoginUser, 
  RegisterUser, 
  LogoutUser, 
  GetUser, 
  UpdateUser,
  userLoginStatus,
  VerifyEmail,
  VerifyUser,
  ForgotPassword,
  resetpassword,
  changePassword

} from "../controllers/auth/userController.js";
import { adminMiddleWare, creatorMiddleWare, protect } from "../midware/AuthMiddleWare.js";
import { DeleteUser, GetAllUsers } from "../controllers/auth/adminController.js";


const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);
router.get("/user", protect, GetUser);
router.patch("/user", protect, UpdateUser);

// admin routes
// delete user

router.delete("/admin/user/:id", protect, adminMiddleWare, DeleteUser);

// get all users

router.get("/admin/users", protect, creatorMiddleWare, GetAllUsers);

//checking user login status
router.get("/login-status", userLoginStatus);

// verfy emial ------> email verfication

router.post("/verify-email", protect , VerifyEmail);

// verify user

router.post("/verify-user/:verificationToken", VerifyUser);

// forgot password
router.post("/forgot-password" , ForgotPassword);

// reset password route

// routes/authRoutes.js
router.post('/reset-password/:resetPasswordToken', resetpassword);

// change password -------> user must be login

router.patch('/change-password' , protect , changePassword);




export default router;