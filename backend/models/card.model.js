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
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: [true, "list is required"],
    },
    dueDate: {
      type: Date,
    },
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

// export default Card
