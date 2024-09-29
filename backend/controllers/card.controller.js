import { User, List, Card } from "../models/index.model.js";
import { asyncHandler, apiResponse, apiError } from "../utils/index.utils.js";

const createCard = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const listID = req.params.listID;

  const { title, description, dueDate, labels } = req.body;

  const list = await List.findById(listID);
  if (!list) {
    throw new apiError(404, "List not found");
  }
  if (list.owner.toString() !== userID.toString()) {
    throw new apiError(401, "Unauthorized");
  }

  const card = await Card.create({
    title,
    description,
    list: listID,
    dueDate,
    labels,
  });
  if (!card) {
    throw new apiError(500, "Card not created");
  }
  list.cards.push(card._id);
  await list.save();
  res.status(200).json(new apiResponse(200, card, "Card created successfully"));
});

const getCards = asyncHandler(async (req, res) => {
  const listID = req.params.listID;
  const list = await List.findById(listID).populate("cards");
  if (!list) {
    throw new apiError(404, "List not found");
  }
  if (list.owner.toString() !== req.user._id.toString()) {
    throw new apiError(401, "Unauthorized");
  }
  res
    .status(200)
    .json(new apiResponse(200, list.cards, "Cards retrieved successfully"));
});

const getCard = asyncHandler(async (req, res) => {
  const cardID = req.params.cardID;
  const card = await Card.findById(cardID);
  if (!card) {
    throw new apiError(404, "Card not found");
  }
  if (card.list.toString() !== req.params.listID) {
    throw new apiError(401, "Unauthorized");
  }
  res
    .status(200)
    .json(new apiResponse(200, card, "Card retrieved successfully"));
});

const updateCard = asyncHandler(async (req, res) => {
  const cardID = req.params.cardID;
  const listID = req.params.listID;
  const { title, description, dueDate, labels } = req.body;

  const list = await List.findById(listID);
  if (!list) {
    throw new apiError(404, "List not found");
  }
  if (list.owner.toString() !== req.user._id.toString()) {
    throw new apiError(401, "Unauthorized");
  }

  const card = await Card.findById(cardID);
  if (!card) {
    throw new apiError(404, "Card not found");
  }

  card.title = title || card.title;
  card.description = description || card.description;
  card.dueDate = dueDate || card.dueDate;
  card.labels = labels || card.labels;
  await card.save();
  res.status(200).json(new apiResponse(200, card, "Card updated successfully"));
});

const deleteCard = asyncHandler(async (req, res) => {
  const cardID = req.params.cardID;
  const listID = req.params.listID;
  const list = await List.findById(listID);
  if (!list) {
    throw new apiError(404, "List not found");
  }
  if (list.owner.toString() !== req.user._id.toString()) {
    throw new apiError(401, "Unauthorized");
  }
  const card = await Card.findById(cardID);
  if (!card) {
    throw new apiError(404, "Card not found");
  }
  await card.deleteOne();
  res.status(200).json(new apiResponse(200, card, "Card deleted successfully"));
});

const updateCardMembers = asyncHandler(async (req, res) => {
  const cardID = req.params.cardID;
  const { members } = req.body;
  const card = await Card.findById(cardID);
  if (!card) {
    throw new apiError(404, "Card not found");
  }
  if (card.list.toString() !== req.params.listID) {
    throw new apiError(401, "Unauthorized");
  }
  card.members = members;
  await card.save();
  res
    .status(200)
    .json(new apiResponse(200, card, "Card members updated successfully"));
});

const addChecklistToCard = asyncHandler(async (req, res) => {
  const cardID = req.params.cardID;
  const { checklistItem } = req.body;
  const card = await Card.findById(cardID);
  if (!card) {
    throw new apiError(404, "Card not found");
  }

  card.checklist.push({ item: checklistItem, completed: false }); // Add checklist item
  await card.save();
  res
    .status(200)
    .json(new apiResponse(200, card, "Checklist added successfully"));
});

const updateChecklistItem = asyncHandler(async (req, res) => {
  const { id, itemId } = req.params;
  const { completed } = req.body;
  const card = await Card.findById(id);
  if (!card) {
    throw new apiError(404, "Card not found");
  }
  const checklistItem = card.checklist.id(itemId);
  if (!checklistItem) {
    return res.status(404).json({ message: "Checklist item not found" });
  }

  checklistItem.completed = completed;
  await card.save();
  res
    .status(200)
    .json(new apiResponse(200, card, "Checklist item updated successfully"));
});

const setCardCover = asyncHandler(async (req, res) => {
  const cardID = req.params.cardID;
  const { coverUrl } = req.body;
  const card = await Card.findById(cardID);
  if (!card) {
    throw new apiError(404, "Card not found");
  }

  card.coverUrl = coverUrl;
  await card.save();
  res
    .status(200)
    .json(new apiResponse(200, card, "Card cover updated successfully"));
});

export {
  createCard,
  getCards,
  getCard,
  updateCard,
  deleteCard,
  updateCardMembers,
  addChecklistToCard,
  updateChecklistItem,
  setCardCover,
};
