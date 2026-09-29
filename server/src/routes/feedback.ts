import { Router } from "express";
import mongoose from "mongoose";
import { Feedback } from "../models/Feedback";

export const feedbackRouter = Router();

feedbackRouter.post("/", async (req, res) => {
  const { userName, emailId, message } = req.body ?? {};
  const valid = [userName, emailId, message].every((v) => typeof v === "string" && v.trim());
  if (!valid) return res.status(400).json({ error: "Name, email and message are required" });

  try {
    await Feedback.create({ userName, emailId, message });
    res.status(201).json({ ok: true });
  } catch (err) {
    const status = err instanceof mongoose.Error.ValidationError ? 400 : 500;
    res.status(status).json({ error: status === 400 ? "Invalid feedback" : "Server error" });
  }
});
