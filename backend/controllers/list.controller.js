import { List, Board, Card, User } from "../models/index.model.js";
import { asyncHandler, apiResponse, apiError } from "../utils/index.utils.js";

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
  res.status(200).json(new apiResponse(200, list, "List created successfully"));
});

const getLists = asyncHandler(async (req, res) => {
  const boardID = req.params.boardID;
  const board = await Board.findById(boardID).populate("lists");
  if (!board) {
    throw new apiError(404, "Board not found");
  }
  res
    .status(200)
    .json(new apiResponse(200, board.lists, "Lists fetched successfully"));
});

const getList = asyncHandler(async (req, res) => {
  const { boardID, listID } = req.params;

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
  await list.deleteOne();
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
