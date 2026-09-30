import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, UserCircle, X } from "lucide-react";
import type { ChatMessage } from "../types";

interface Props {
  messages: ChatMessage[];
  userName: string;
  onSend: (text: string) => void;
  open: boolean;
  onClose: () => void;
  unread: number;
}

export default function ChatPanel({ messages, userName, onSend, open, onClose }: Props) {
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => endRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages],
  );

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <>
      <div className={`chat-backdrop ${open ? "is-open" : ""}`} onClick={onClose} />
      <div className={`main__right ${open ? "is-open" : ""}`}>
        <div className="chat-header">
          <span className="chat-header__title">
            <MessageCircle size={16} /> Messages
          </span>
          <button className="chat-drawer__close" onClick={onClose} aria-label="Close chat">
            <X size={16} />
          </button>
        </div>

        <div className="main__chat_window">
          {messages.length === 0 && (
            <p className="chat-empty">No messages yet. Say hi 👋</p>
          )}
          <div className="messages">
            {messages.map((m, i) => {
              const isMe = m.userName === userName;
              return (
                <div className={`message ${isMe ? "message--me" : "message--them"}`} key={i}>
                  {!isMe && (
                    <span className="message__author">
                      <UserCircle size={13} /> {m.userName}
                    </span>
                  )}
                  <div className="message__bubble">{m.text}</div>
                  <span className="message__time">
                    {new Date(m.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>
        </div>

        <div className="main__message_container">
          <input
            value={text}
            autoComplete="off"
            placeholder="Type a message…"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button className="send-btn" onClick={send} aria-label="Send message">
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
