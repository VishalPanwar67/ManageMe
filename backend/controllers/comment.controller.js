import { Card, Comment } from "../models/index.model.js";
import { asyncHandler, apiError } from "../utils/indexUtils.js";
import { apiResponse } from "../apiResponse.js";

const addComment = asyncHandler(async (req, res, io) => {
  const cardID = req.params.cardID;
  const { content } = req.body;
  const userID = req.user._id;
  console.log(cardID, content, userID);
  const card = await Card.findById(cardID);
  if (!card) {
    throw new apiError(404, "Card not found");
  }

  const comment = await Comment.create({
    content,
    card: cardID,
    owner: userID,
  });
  if (!comment) {
    throw new apiError(500, "Comment not created");
  }

  card.comments.push(comment._id);
  await card.save();
  console.log(userID.toString());
  req.io.to(userID.toString()).emit("commentAdded", comment);
  res.status(200).json(new apiResponse(200, comment, "Comment created"));
});

const getComments = asyncHandler(async (req, res) => {
  const cardID = req.params.cardID;
  const comments = await Comment.find({ card: cardID });
  if (!comments) {
    throw new apiError(404, "Comments not found");
  }
  res.status(200).json(new apiResponse(200, comments, "Comments fetched"));
});

const getComment = asyncHandler(async (req, res) => {
  const commentID = req.params.commentID;
  const comment = await Comment.findById(commentID);
  if (!comment) {
    throw new apiError(404, "Comment not found");
  }
  res.status(200).json(new apiResponse(200, comment, "Comment fetched"));
});

const deleteComment = asyncHandler(async (req, res, io) => {
  const commentID = req.params.commentID;
  const userID = req.user._id;
  const comment = await Comment.findById(commentID);
  if (!comment) {
    throw new apiError(404, "Comment not found");
  }
  if (comment.owner.toString() !== userID.toString()) {
    throw new apiError(401, "Unauthorized");
  }
  await comment.deleteOne();
  req.io.to(userID.toString()).emit("commentDeleted", commentID);
  res
    .status(200)
    .json(new apiResponse(200, comment, "Comment deleted successfully"));
});

export { addComment, getComments, getComment, deleteComment };
