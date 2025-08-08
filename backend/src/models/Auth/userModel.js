import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true , "please enter name"]},

    email: {type: String, required:[ true , "please enter email"], unique: true , trim: true , match: [/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, "please enter valid email"]},

    password: {type: String, required: [true ,"please enter password"], minlength: 6},

    photo:{type:String , default: "https://i.pinimg.com/736x/b5/74/6c/b5746c4b021b30f62a13a30f865c32bc.jpg"},

    bio: {type: String , default: "I am a new user"},

    role: {type: String, enum:["user","admin" ,"creator"] , default: "user"},

    isVerified: {type: Boolean, default: false},

    date: {type: Date, default: Date.now}

} , {timestamps: true , minimize:true});

  userSchema.pre("save", async function(next){
    //check if password is not modified
    if(!this.isModified("password")){
        next();
    }

    //hash password using bcrypt
    // generate salt
    const salt = await bcrypt.genSalt(10);

    //hash password using salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password= hashedPassword;
    //call next middleware
    next();
});


const user = mongoose.model("user", userSchema);
export default user;