import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // to get cookies from req object and set cookies in res object
import { v2 as cloudinary } from "cloudinary"; //for using cloudinary

import connectMongoDB from "./db/connectMongoDB.js";

import { authRoutes, boardRoutes } from "./routes/index.routes.js";

dotenv.config({
  path: "././.env",
}); //dotevn file configed

const PORT = process.env.PORT || 3000; //port

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Middlewares
app.use(express.json()); // to parse req.body
app.use(urlencoded({ extended: true })); // to parse form data (urlencoded)
app.use(cookieParser()); // to get cookies from req object and set cookies in res object

// Routes
app.use("/api/auth", authRoutes);
app.use("/board", boardRoutes);

// connect the DataBase
connectMongoDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`app is not able to connect :: ${error}`);
      throw error;
    });
    app.listen(PORT || 3000, () => {
      console.log(`app is listening on port :: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`index.js :: connectDB connection failed  :: ${error}`);
  });
