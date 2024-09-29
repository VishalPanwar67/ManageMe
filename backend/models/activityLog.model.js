// models/activityLog.model.js
import mongoose, { Schema } from "mongoose";

const activityLogSchema = new Schema(
  {
    actionType: {
      type: String,
      enum: ["create", "update", "delete"],
      required: [true, "action type is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: false, // Activity might not always be related to a board
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: false, // Activity might not always be related to a list
    },
    card: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: false, // Activity might not always be related to a card
    },
    activityContext: {
      // New field to hold context details
      type: {
        type: String,
        enum: ["card", "list", "board"], // Define valid activity types
        required: true,
      },
      details: {
        type: Object, // You can customize this further if needed
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
