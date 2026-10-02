import { FormEvent, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useAnimations } from "../hooks/useAnimations";

const empty = { userName: "", emailId: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const { slideInLeft, slideInRight } = useAnimations();

  const set =
    (k: keyof typeof empty) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });
  const API_URL = import.meta.env.VITE_API_URL;

  async function submit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setForm(empty);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="page page-contact">
      <Navbar />
      <div className="contact">
        <motion.div className="contact__visual" {...slideInLeft()}>
          <img src="/img/text_chat.png" alt="" />
        </motion.div>

        <motion.div className="contact__form" {...slideInRight(0.1)}>
          <h2>We'd love to hear from you</h2>
          <form onSubmit={submit}>
            <label htmlFor="username">Your name</label>
            <input
              id="username"
              value={form.userName}
              onChange={set("userName")}
              required
            />

            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={form.emailId}
              onChange={set("emailId")}
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={form.message}
              onChange={set("message")}
              required
            />

            <button type="submit" className="btn btn--primary">
              Send message
            </button>
          </form>

          {status === "ok" && (
            <p className="form-status form-status--ok">
              <CheckCircle size={16} /> Thanks — your message is on its way.
            </p>
          )}
          {status === "error" && (
            <p className="form-status form-status--error">
              <AlertCircle size={16} /> Something went wrong. Please try again.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
