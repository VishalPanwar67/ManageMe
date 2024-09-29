import express from "express";

import { protectRoute } from "../middlewares/protectRoute.js";
import { withSocket } from "../utils/withSocket.js";

import {
  addActivityLog,
  getAllActivityLogs,
} from "../controllers/activity.controller.js";

const router = express.Router();

const setupActivityLogRoutes = (io) => {
  router.post(
    "/:boardID/:listID/:cardID",
    protectRoute,
    withSocket(addActivityLog, io)
  );

  router.get("/", protectRoute, getAllActivityLogs);

  return router;
};

export default setupActivityLogRoutes;
