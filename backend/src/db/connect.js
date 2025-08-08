import mongoose from "mongoose";

const connect = async () => {
  try {
    console.log("Attempting to connect database...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 4500
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Connection error:", error.message);
    process.exit(1);
  }

  //g-c8s 0n t
};

export default connect; 