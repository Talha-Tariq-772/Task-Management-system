import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import errorHandler from "./src/helpers/errorsHandlers.js";
import connect from "./src/db/connect.js";

// 1. Load environment variables FIRST
dotenv.config();

// Add after dotenv.config()
console.log("Current directory:", process.cwd());
console.log("Environment variables loaded:", {
  MONGO_URI: !!process.env.MONGO_URI,
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL
});

// Verify environment variables immediately
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env file");
}

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes - Fixed using async/await
async function loadRoutes() {
  const routesFiles = fs.readdirSync("./src/routes");
  
  for (const file of routesFiles) {
    try {
      const route = await import(`./src/routes/${file}`);
      app.use("/api/v1", route.default);
    } catch (err) {
      console.error(`Failed to import route ${file}:`, err.message);
      process.exit(1);
    }
  }
}

// Error handler must be AFTER routes
app.use(errorHandler);

// Server startup
const startServer = async () => {
  try {
    await connect();
    await loadRoutes();
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`MongoDB URI: ${process.env.MONGO_URI.substring(0, 25)}...`); // Partial log for verification
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();