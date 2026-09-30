// import { FormEvent, useState } from "react";
// import Navbar from "../components/Navbar";

// const empty = { userName: "", emailId: "", message: "" };

// export default function Contact() {
//   const [form, setForm] = useState(empty);
//   const [status, setStatus] = useState("");

//   const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
//     setForm({ ...form, [k]: e.target.value });

//   async function submit(e: FormEvent) {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/feedback", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       if (!res.ok) throw new Error();
//       setForm(empty);
//       setStatus("Thank you for your message!");
//     } catch {
//       setStatus("An error occurred. Please try again later.");
//     }
//   }

//   return (
//     <div className="body page-contact">
//       <Navbar />
//       <div className="contact">
//         <div className="img"><img src="/img/text_chat.png" alt="" /></div>
//         <div className="form">
//           <h2>We'd love to hear from you!</h2>
//           <form onSubmit={submit}>
//             <label htmlFor="username">Your name</label>
//             <input id="username" value={form.userName} onChange={set("userName")} required />
//             <label htmlFor="email">Email Id</label>
//             <input id="email" type="email" value={form.emailId} onChange={set("emailId")} required />
//             <label htmlFor="message">Message</label>
//             <textarea id="message" value={form.message} onChange={set("message")} required />
//             <button type="submit">Send</button>
//           </form>
//           {status && <p className="form-status">{status}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

import { FormEvent, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";

const empty = { userName: "", emailId: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const set =
    (k: keyof typeof empty) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/feedback", {
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
        <div className="contact__visual">
          <img src="/img/text_chat.png" alt="" />
        </div>

        <div className="contact__form">
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
        </div>
      </div>
    </div>
  );
}
