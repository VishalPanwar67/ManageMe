import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";

import {
  searchCards,
  searchLists,
  searchBoards,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/boards", protectRoute, searchBoards);
router.get("/lists", protectRoute, searchLists);
router.get("/cards", protectRoute, searchCards);

export default router;
