import express from "express";

import {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
  archiveRestoreBoard,
  duplicateBoard,
} from "../controllers/board.controller.js";

import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createBoard);
router.get("/", protectRoute, getBoards);
router.get("/:id", protectRoute, getBoardById);
router.patch("/:id", protectRoute, updateBoard);
router.delete("/:id", protectRoute, deleteBoard);

router.patch("/archive/:id", protectRoute, archiveRestoreBoard);
router.post("/dublicate/:id", protectRoute, duplicateBoard);

export default router;
