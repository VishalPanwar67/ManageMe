import express from "express";

import { protectRoute } from "../middlewares/protectRoute.js";

import {
  createCard,
  getCards,
  getCard,
  updateCard,
  deleteCard,
  updateCardMembers,
  addChecklistToCard,
  updateChecklistItem,
  setCardCover,
} from "../controllers/card.controller.js";

const router = express.Router();

//CRUD operations
router.post("/:listID", protectRoute, createCard);
router.get("/:listID", protectRoute, getCards);
router.get("/:listID/:cardID", protectRoute, getCard);
router.patch("/:listID/:cardID", protectRoute, updateCard);
router.delete("/:listID/:cardID", protectRoute, deleteCard);

//Additional operations
router.patch("/:id/members", protectRoute, updateCardMembers);
router.post("/:id/checklist", protectRoute, addChecklistToCard);
router.patch("/:id/checklist/:itemId", protectRoute, updateChecklistItem);
router.patch("/:id/cover", protectRoute, setCardCover);

export default router;
