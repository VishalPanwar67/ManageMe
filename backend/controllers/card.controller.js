import { User, List, Card } from "../models/index.model.js";
import { asyncHandler, apiResponse, apiError } from "../utils/index.utils.js";
import { addActivityLog } from "./activity.controller.js";

const createCard = asyncHandler(async (req, res, io) => {
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

  const current_date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;

  // console.log(current_date);

  const card = await Card.create({
    title,
    description: description || "description",
    list: listID,
    dueDate: dueDate || current_date,
    labels: labels || "lables",
  });
  if (!card) {
    throw new apiError(500, "Card not created");
  }
  list.cards.push(card._id);
  await list.save();

  // Log the activity of creating a card
  const context = {
    type: "card",
    details: {
      cardId: card._id,
      title: card.title,
    },
  };
  await addActivityLog("create", userID, context);

  if (card.assignedMembers) {
    card.assignedMembers.forEach((memberId) => {
      io.to(memberId.toString()).emit("cardCreated", card);
    });
  }
  res.status(200).json(new apiResponse(200, card, "Card created successfully"));
});

const getCards = asyncHandler(async (req, res) => {
  const listID = req.params.listID;
  const list = await List.findById(listID).populate({
    path: "cards",
    options: { sort: { createdAt: -1 } },
  });
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

const updateCard = asyncHandler(async (req, res, io) => {
  const userID = req.user._id;
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

  const context = {
    type: "card",
    details: {
      cardId: card._id,
      title: card.title,
    },
  };
  await addActivityLog("update", userID, context);

  if (card.assignedMembers.length > 0) {
    // Notify assigned members
    assignedMembers.forEach((memberId) => {
      io.to(memberId).emit("cardUpdated", card);
    });
  }

  res.status(200).json(new apiResponse(200, card, "Card updated successfully"));
});

const deleteCard = asyncHandler(async (req, res, io) => {
  const userID = req.user._id;
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
  const context = {
    type: "card",
    details: {
      cardId: card._id,
      title: card.title,
    },
  };
  await addActivityLog("delete", userID, context);
  if (card.assignedMembers.length > 0) {
    // Notify assigned members
    const assignedMembers = card.assignedMembers || []; // Fetch members from card
    assignedMembers.forEach((memberId) => {
      io.to(memberId).emit("cardDeleted", cardID);
    });
  }

  res.status(200).json(new apiResponse(200, card, "Card deleted successfully"));
});

const updateCardMembers = asyncHandler(async (req, res, io) => {
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

  if (card.assignedMembers.length > 0) {
    // Notify newly assigned members
    members.forEach((memberId) => {
      io.to(memberId).emit("cardMembersUpdated", card);
    });
  }

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
