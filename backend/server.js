import express, { urlencoded } from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser"; // to get cookies from req object and set cookies in res object
import { v2 as cloudinary } from "cloudinary"; //for using cloudinary

import connectMongoDB from "./db/connectMongoDB.js";
//socket
import http from "http"; // Import the HTTP module for the server
import { initSocket } from "./sockets/socket.js"; // Import the socket initialization function

import {
  authRoutes,
  boardRoutes,
  listRoutes,
  setupCardRoutes,
} from "./routes/index.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

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
const server = http.createServer(app); // Create an HTTP server Socket.io

// Middlewares
app.use(express.json()); // to parse req.body
app.use(urlencoded({ extended: true })); // to parse form data (urlencoded)
app.use(cookieParser()); // to get cookies from req object and set cookies in res object

// Initialize Socket.io
const io = initSocket(server);

// Routes
app.use("/api/auth", authRoutes);
app.use("/board", boardRoutes);
app.use("/list", listRoutes);
app.use("/card", setupCardRoutes(io));

app.use(errorHandler);

// connect the DataBase
connectMongoDB()
  .then(() => {
    server.on("error", (error) => {
      console.log(`app is not able to connect :: ${error}`);
      throw error;
    });

    // Server listens on the specified port
    server.listen(PORT || 3000, () => {
      console.log(`app is listening on port :: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`index.js :: connectDB connection failed  :: ${error}`);
  });
