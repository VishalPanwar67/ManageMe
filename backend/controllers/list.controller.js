import { List, Board, Card, User } from "../models/index.model.js";
import { addActivityLog } from "./activity.controller.js";
import { asyncHandler } from "../utils/indexUtils.js";
import { apiResponse } from "../apiResponse.js";
import { apiError } from "../apiError.js";

const createList = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const { title } = req.body;
  const boardID = req.params.boardID;
  const board = await Board.findById(boardID);
  if (!board) {
    throw new apiError(404, "Board not found");
  }
  const list = await List.create({
    title,
    board: boardID,
    owner: userID,
  });
  if (!list) {
    throw new apiError(500, "List not created");
  }
  board.lists.push(list._id);
  await board.save();

  const context = {
    type: "list", // Ensure the type is "board"
    details: {
      boardId: list._id, // Correctly reference the newly created board ID
      title: list.title,
    },
  };
  await addActivityLog("create", userID, context);
  res.status(200).json(new apiResponse(200, list, "List created successfully"));
});

const getLists = asyncHandler(async (req, res) => {
  const boardID = req.params.boardID;
  const board = await Board.findById(boardID).populate({
    path: "lists",
    options: { sort: { createdAt: -1 } },
  });
  if (!board) {
    throw new apiError(404, "Board not found");
  }
  res
    .status(200)
    .json(new apiResponse(200, board.lists, "Lists fetched successfully"));
});

const getList = asyncHandler(async (req, res) => {
  const { listID } = req.params;

  const list = await List.findById(listID);

  if (!list) {
    throw new apiError(404, "List not found");
  }

  res.status(200).json(new apiResponse(200, list, "List fetched successfully"));
});

const updateList = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const boardID = req.params.boardID;
  const listID = req.params.listID;
  const { title } = req.body;
  const list = await List.findById(listID);
  if (!list) {
    throw new apiError(404, "List not found");
  }

  if (
    list.board.toString() !== boardID ||
    list.owner.toString() !== userID.toString()
  ) {
    throw new apiError(401, "Unauthorized");
  }
  list.title = title;
  await list.save();
  const context = {
    type: "list", // Ensure the type is "board"
    details: {
      boardId: list._id, // Correctly reference the newly created board ID
      title: list.title,
    },
  };
  await addActivityLog("update", userID, context);
  res.status(200).json(new apiResponse(200, list, "List updated successfully"));
});

const deleteList = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const boardID = req.params.boardID;
  const listID = req.params.listID;
  const list = await List.findById(listID);
  if (!list) {
    throw new apiError(404, "List not found");
  }
  if (
    list.board.toString() !== boardID ||
    list.owner.toString() !== userID.toString()
  ) {
    throw new apiError(401, "Unauthorized");
  }

  const cards = await Card.find({ list: listID });
  if (cards.length > 0) {
    await Card.deleteMany({ list: listID });
  }

  await list.deleteOne();
  const context = {
    type: "list", // Ensure the type is "board"
    details: {
      boardId: list._id, // Correctly reference the newly created board ID
      title: list.title,
    },
  };
  await addActivityLog("delete", userID, context);
  res.status(200).json(new apiResponse(200, list, "List deleted successfully"));
});

const duplicateList = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const boardID = req.params.boardID;
  const listID = req.params.listID;
  const list = await List.findById(listID);
  if (!list) {
    throw new apiError(404, "List not found");
  }
  if (
    list.board.toString() !== boardID ||
    list.owner.toString() !== userID.toString()
  ) {
    throw new apiError(401, "Unauthorized");
  }
  const newList = await List.create({
    title: list.title + " (copy)",
    board: boardID,
    owner: userID,
  });
  if (!newList) {
    throw new apiError(500, "List not created");
  }
  res
    .status(200)
    .json(new apiResponse(200, newList, "List duplicated successfully"));
});

const toggleArchive = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const boardID = req.params.boardID;
  const listID = req.params.listID;
  const list = await List.findById(listID);
  if (!list) {
    throw new apiError(404, "List not found");
  }
  if (
    list.board.toString() !== boardID ||
    list.owner.toString() !== userID.toString()
  ) {
    throw new apiError(401, "Unauthorized");
  }
  list.isArchived = !list.isArchived;
  await list.save();
  res
    .status(200)
    .json(new apiResponse(200, list, "List archived successfully"));
});

const addCommentToList = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const boardID = req.params.boardID;
  const listID = req.params.listID;
  const { comment } = req.body;
  const list = await List.findById(listID);
  if (!list) {
    throw new apiError(404, "List not found");
  }
  if (
    list.board.toString() !== boardID ||
    list.owner.toString() !== userID.toString()
  ) {
    throw new apiError(401, "Unauthorized");
  }
  list.comments.push(comment);
  await list.save();
  res
    .status(200)
    .json(new apiResponse(200, list, "List comment added successfully"));
});

export {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
  duplicateList,
  toggleArchive,
  addCommentToList,
};
