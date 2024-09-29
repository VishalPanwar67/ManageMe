import express from "express";

import { protectRoute } from "../middlewares/protectRoute.js";
import { withSocket } from "../utils/withSocket.js";

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

const setupCardRoutes = (io) => {
  //CRUD operations;
  router.post("/:listID", protectRoute, withSocket(createCard, io));
  router.get("/:listID", protectRoute, getCards);
  router.get("/:listID/:cardID", protectRoute, getCard);
  router.patch("/:listID/:cardID", protectRoute, withSocket(updateCard, io));
  router.delete("/:listID/:cardID", protectRoute, withSocket(deleteCard, io));

  //Additional operations
  router.patch("/:id/members", protectRoute, withSocket(updateCardMembers, io));
  router.post("/:id/checklist", protectRoute, addChecklistToCard);
  router.patch("/:id/checklist/:itemId", protectRoute, updateChecklistItem);
  router.patch("/:id/cover", protectRoute, setCardCover);

  return router;
};

export default setupCardRoutes;
