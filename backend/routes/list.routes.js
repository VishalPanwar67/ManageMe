import express from "express";

import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

import {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
  duplicateList,
  toggleArchive,
  addCommentToList,

} from "../controllers/list.controller.js";

//CRUD operations
router.post("/:boardID", protectRoute, createList);
router.get("/:boardID", protectRoute, getLists);
router.get("/:boardID/:listID", protectRoute, getList);
router.patch("/:boardID/:listID", protectRoute, updateList);
router.delete("/:boardID/:listID", protectRoute, deleteList);

//Additional operations
router.patch("/:boardID/:listID/archive", protectRoute, toggleArchive);
router.post("/:boardID/:listID/duplicate", protectRoute, duplicateList);
router.post("/:boardID/:listID/comment", protectRoute, addCommentToList);


export default router;
