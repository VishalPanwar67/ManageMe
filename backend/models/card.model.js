import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      //   required: [true, "description is required"],
    },
    dueDate: {
      // type: Date,
      type: String,
    },
    checklist: [
      {
        item: { type: String },
        completed: { type: Boolean, default: false },
      },
    ],
    cover: {
      type: String, // URL of an image or color hex
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: [true, "list is required"],
    },
    labels: [
      {
        type: String,
      },
    ],
    assignedMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    activityLogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "ActivityLog",
      },
    ],
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attachment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Card = mongoose.model("Card", cardSchema);
