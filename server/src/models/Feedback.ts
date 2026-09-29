import { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
  {
    userName: { type: String, required: true, trim: true, maxlength: 100 },
    emailId: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true }
);

export const Feedback = model("Feedback", feedbackSchema);
