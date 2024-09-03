import express from "express";
import dotenv from "dotenv";

import connectMongoDB from "./db/connectMongoDB.js";
import { authRoutes } from "./routes/index.routes.js";

dotenv.config({
  path: "././.env",
}); //dotevn file configed
const PORT = process.env.PORT || 3000; //port

const app = express();

app.use("/api/auth", authRoutes);

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
