import asyncHandler from "express-async-handler";
// Correct import
import user from '../../models/Auth/userModel.js';

export const DeleteUser = asyncHandler(async (req, res) => {

    // desutructring id from params
    const {id} = req.params;

    // find and delete user by id
    const User = await user.findByIdAndDelete(id);

    if(!User){
        res.status(404).json({message: "User not found"});
    }

    res.status(200).json({message: "User deleted successfully"});
    


});


// get all users
export const GetAllUsers= asyncHandler(async (req ,  res) => {
    const Users = await user.find({});

    if(!Users){
        res.status(404).json({message: "No users found"});
    }

    res.status(200).json(Users);

});