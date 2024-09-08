import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      //   unique: true,
    },
    description: {
      type: String,
      //   required: [true, "description is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
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

export const Board = mongoose.model("Board", boardSchema);
