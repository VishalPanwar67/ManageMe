import { Board, List, Card } from "../models/index.model.js";
import { asyncHandler, apiError } from "../utils/indexUtils.js";
import { apiResponse } from "../utils/apiResponse.js";

const searchBoards = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    throw new apiError(400, "Query parameter is required");
  }

  const boards = await Board.find({
    title: { $regex: query, $options: "i" }, // Case-insensitive search
  });

  res
    .status(200)
    .json(new apiResponse(200, boards, "Boards retrieved successfully"));
});

const searchLists = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    throw new apiError(400, "Query parameter is required");
  }

  const lists = await List.find({
    title: { $regex: query, $options: "i" }, // Case-insensitive search
  });

  res
    .status(200)
    .json(new apiResponse(200, lists, "Lists retrieved successfully"));
});

const searchCards = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    throw new apiError(400, "Query parameter is required");
  }

  const cards = await Card.find({
    title: { $regex: query, $options: "i" }, // Case-insensitive search
  });

  res
    .status(200)
    .json(new apiResponse(200, cards, "Cards retrieved successfully"));
});

export { searchBoards, searchLists, searchCards };
