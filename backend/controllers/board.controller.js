import { Board, User, List, Card } from "../models/index.model.js";
import { asyncHandler, apiError } from "../utils/indexUtils.js";
import { addActivityLog } from "./activity.controller.js";
import { apiResponse } from "../utils/apiResponse.js";

const createBoard = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const userID = req.user._id;

  if (!title || !description) {
    throw new apiError(400, "All fields are required");
  }

  const board = await Board.create({
    title,
    description,
    owner: userID,
  });

  if (!board) {
    throw new apiError(400, "Board not created");
  }

  const user = await User.findById(userID);
  if (!user) {
    throw new apiError(404, "User not found");
  }

  if (!user.boards.includes(board._id)) {
    user.boards.push(board._id);
    await user.save();
  }

  // Create activity context for the new board
  const context = {
    type: "board", // Ensure the type is "board"
    details: {
      boardId: board._id, // Correctly reference the newly created board ID
      title: board.title,
    },
  };
  await addActivityLog("create", userID, context);

  return res
    .status(201)
    .json(new apiResponse(201, board, "Board created successfully"));
});

const getBoards = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const boards = await Board.find({ owner: userID })
    .populate("lists activityLogs")
    .sort({ createdAt: -1 });

  if (!boards) {
    throw new apiError(404, "Boards not found");
  }

  res
    .status(200)
    .json(new apiResponse(200, boards, "Boards fetched successfully"));
});

const getBoardById = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const boardID = req.params.id;
  const board = await Board.findById(boardID).populate("lists activityLogs");
  if (!board) {
    throw new apiError(404, "Board not found");
  }
  //   console.log(
  //     board.owner.toString(),
  //     typeof board.owner.toString(),
  //     userID,
  //     typeof userID.toString()
  //   );
  if (board.owner.toString() !== userID.toString()) {
    throw new apiError(401, "Unauthorized");
  }

  res
    .status(200)
    .json(new apiResponse(200, board, "Board fetched successfully"));
});

const updateBoard = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const boardID = req.params.id;
  const { title, description } = req.body;
  const board = await Board.findById(boardID);
  if (!board) {
    throw new apiError(404, "Board not found");
  }

  if (board.owner.toString() !== userID.toString()) {
    throw new apiError(401, "Unauthorized");
  }

  board.title = title || board.title;
  board.description = description || board.description;
  await board.save();

  const context = {
    type: "board", // Ensure the type is "board"
    details: {
      boardId: board._id, // Correctly reference the newly created board ID
      title: board.title,
    },
  };
  await addActivityLog("update", userID, context);

  res
    .status(200)
    .json(new apiResponse(200, board, "Board updated successfully"));
});

const deleteBoard = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const boardID = req.params.id;

  const board = await Board.findById(boardID);
  if (!board) {
    throw new apiError(404, "Board not found");
  }

  if (board.owner.toString() !== userID.toString()) {
    throw new apiError(401, "Unauthorized");
  }

  const lists = await List.find({ board: boardID });
  // console.log(lists.length);
  if (lists.length > 0) {
    await Card.deleteMany({ list: { $in: lists.map((list) => list._id) } });
  }

  await List.deleteMany({ board: boardID });

  await board.deleteOne();

  const context = {
    type: "board", // Ensure the type is "board"
    details: {
      boardId: board._id, // Correctly reference the newly created board ID
      title: board.title,
    },
  };
  await addActivityLog("delete", userID, context);
  res
    .status(200)
    .json(new apiResponse(200, board, "Board deleted successfully"));
});

const archiveRestoreBoard = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const boardID = req.params.id;
  const board = await Board.findById(boardID);
  if (!board) {
    throw new apiError(404, "Board not found");
  }
  if (board.owner.toString() !== userID.toString()) {
    throw new apiError(401, "Unauthorized");
  }
  board.archived = !board.archived;
  await board.save();
  res
    .status(200)
    .json(new apiResponse(200, board, "Board updated successfully"));
});

const duplicateBoard = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const boardID = req.params.id;
  const board = await Board.findById(boardID).populate("lists");
  if (!board) {
    throw new apiError(404, "Board not found");
  }

  if (board.owner.toString() !== userID.toString()) {
    throw new apiError(401, "Unauthorized");
  }

  const newBoard = await Board.create({
    title: `${board.title} -copy`,
    description: board.description,
    owner: userID,
    lists: board.lists,
  });

  if (!newBoard) {
    throw new apiError(500, "Board not created");
  }

  const user = await User.findById(userID);
  if (!user) {
    throw new apiError(404, "User not found");
  }

  if (!user.boards.includes(newBoard._id)) {
    user.boards.push(newBoard._id);
    await user.save();
  }
  const context = {
    type: "board", // Ensure the type is "board"
    details: {
      boardId: newBoard._id, // Correctly reference the newly created board ID
      title: newBoard.title,
    },
  };
  await addActivityLog("create", userID, context);
  res
    .status(200)
    .json(new apiResponse(200, newBoard, "Board duplicated successfully"));
});

export {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
  archiveRestoreBoard,
  duplicateBoard,
};
