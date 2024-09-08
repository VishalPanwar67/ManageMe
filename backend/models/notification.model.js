import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    message: {
      type: String,
      required: [true, "message is required"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: false, // Notification might not always be related to a board
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: false, // Notification might not always be related to a list
    },
    card: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: false, // Notification might not always be related to a card
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model("Notification", notificationSchema);
