import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Video as VideoIcon,
  VideoOff,
  Mic,
  MicOff,
  Circle,
  StopCircle,
  Monitor,
  UserPlus,
  MessageCircle,
} from "lucide-react";
import ChatPanel from "../components/ChatPanel";
import Navbar from "../components/Navbar";
import Video from "../components/Video";
import { useRoom } from "../hooks/useRoom";

export default function Room() {
  const { roomId = "" } = useParams();
  const [name, setName] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const room = useRoom(roomId, name);

  useEffect(() => {
    if (!chatOpen && room.messages.length > 0) {
      setUnread((n) => n + 1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room.messages.length]);

  const openChat = () => { setChatOpen(true); setUnread(0); };
  const join = () => draft.trim() && setName(draft.trim());
  const invite = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Room link copied — share it with your friend!");
  };

  return (
    <div className="page page-room">
      <Navbar />
      {room.error && <div className="error-banner">{room.error}</div>}

      <div className="main">
        <div className="main__left">
          <div className="videos__group">
            <div id="video-grid">
              {room.local && <Video stream={room.local} muted local label="You" />}
              {Object.entries(room.remote).map(([id, s]) => (
                <Video key={id} stream={s} />
              ))}
            </div>
          </div>

          <div className="dock">
            <div className="dock__group">
              <button
                className={`dock__btn ${!room.camOn ? "dock__btn--off" : ""}`}
                onClick={room.toggleCam}
                data-tooltip={room.camOn ? "Turn off camera" : "Turn on camera"}
              >
                {room.camOn ? <VideoIcon size={20} /> : <VideoOff size={20} />}
              </button>
              <button
                className={`dock__btn ${!room.micOn ? "dock__btn--off" : ""}`}
                onClick={room.toggleMic}
                data-tooltip={room.micOn ? "Mute" : "Unmute"}
              >
                {room.micOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              <button
                className={`dock__btn ${room.recording ? "dock__btn--off" : ""}`}
                onClick={room.toggleRecording}
                data-tooltip={room.recording ? "Stop recording" : "Record"}
              >
                {room.recording ? <StopCircle size={20} /> : <Circle size={20} />}
              </button>
              <button
                className={`dock__btn ${room.sharing ? "dock__btn--active" : ""}`}
                onClick={room.shareScreen}
                data-tooltip="Screen share"
              >
                <Monitor size={20} />
              </button>
            </div>

            <div className="dock__group">
              <button className="dock__btn" onClick={invite} data-tooltip="Invite">
                <UserPlus size={20} />
              </button>
              <button
                className={`dock__btn ${chatOpen ? "dock__btn--active" : ""}`}
                onClick={openChat}
                data-tooltip="Chat"
              >
                <MessageCircle size={20} />
                {unread > 0 && <span className="dock__badge">{unread}</span>}
              </button>
            </div>
          </div>
        </div>

        <ChatPanel
          messages={room.messages}
          userName={name ?? ""}
          onSend={room.sendMessage}
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          unread={unread}
        />
      </div>

      {!name && (
        <div className="name-modal">
          <div className="name-modal__card">
            <div className="name-modal__icon">
              <VideoIcon size={26} />
            </div>
            <h2>What's your name?</h2>
            <p className="name-modal__sub">Others in the room will see this.</p>
            <input
              autoFocus
              value={draft}
              placeholder="Your name"
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && join()}
            />
            <button className="btn btn--primary" onClick={join}>Join call</button>
          </div>
        </div>
      )}
    </div>
  );
}
