import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../types";

interface Props {
  messages: ChatMessage[];
  userName: string;
  onSend: (text: string) => void;
  style?: React.CSSProperties;
}

export default function ChatPanel({ messages, userName, onSend, style }: Props) {
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="main__right" style={style}>
      <h2>Messages</h2>
      <div className="main__chat_window">
        <div className="messages">
          {messages.map((m, i) => (
            <div className="message" key={i}>
              <b><i className="far fa-user-circle" /> <span>{m.userName === userName ? "me" : m.userName}</span></b>
              <span>{m.text} <br /><i>{new Date(m.at).toLocaleTimeString()}</i></span>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>
      <div className="main__message_container">
        <input
          value={text}
          autoComplete="off"
          placeholder="Type message here..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <div className="options__button" onClick={send}><i className="fas fa-paper-plane" /></div>
      </div>
    </div>
  );
}
