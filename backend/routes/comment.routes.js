import express from "express";

import { protectRoute } from "../middlewares/protectRoute.js";
import { withSocket } from "../utils/withSocket.js";

import {
  addComment,
  getComments,
  getComment,
  deleteComment,
} from "../controllers/comment.controller.js";
const router = express.Router();

const setupCommentRoutes = (io) => {
  router.post("/:cardID", protectRoute, withSocket(addComment, io));
  router.get("/:cardID", protectRoute, getComments);
  router.get("/:cardID/:commentID", protectRoute, getComment);
  router.delete("/:commentID", protectRoute, withSocket(deleteComment, io));
  return router;
};

export default setupCommentRoutes;
