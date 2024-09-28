import mongoose, { Schema } from "mongoose";

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: String,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: [true, "board is required"],
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
    activityLogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "ActivityLog",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const List = mongoose.model("List", listSchema);
