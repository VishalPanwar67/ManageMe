import mongoose, { Schema } from "mongoose";

const attachmentSchema = new Schema(
  {
    card: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: [true, "card is required"],
    },
    url: {
      type: String,
      required: [true, "attachment URL is required"],
    },
    filename: {
      type: String,
      required: [true, "filename is required"],
    },
    fileType: {
      type: String,
      required: [true, "file type is required"],
    },
    fileSize: {
      type: Number,
      required: [true, "file size is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Attachment = mongoose.model("Attachment", attachmentSchema);
