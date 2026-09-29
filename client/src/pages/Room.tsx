// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import ChatPanel from "../components/ChatPanel";
// import Navbar from "../components/Navbar";
// import Video from "../components/Video";
// import { useRoom } from "../hooks/useRoom";

// export default function Room() {
//   const { roomId = "" } = useParams();
//   const [name, setName] = useState<string | null>(null);
//   const [draft, setDraft] = useState("");
//   const [chatOpen, setChatOpen] = useState(false);
//   const room = useRoom(roomId, name);

//   const join = () => draft.trim() && setName(draft.trim());
//   const invite = async () => {
//     await navigator.clipboard.writeText(window.location.href);
//     alert("Room link copied — share it with your friend!");
//   };
//   const red = (off: boolean) => `options__button ${off ? "background__red" : ""}`;

//   return (
//     <div className="body page-room">
//       <Navbar>
//         {chatOpen && (
//           <div className="header__back" style={{ display: "block" }} onClick={() => setChatOpen(false)}>
//             <i className="fas fa-angle-left" />
//           </div>
//         )}
//       </Navbar>
//       {room.error && <div className="error-banner">{room.error}</div>}

//       <div className="main">
//         <ChatPanel
//           messages={room.messages}
//           userName={name ?? ""}
//           onSend={room.sendMessage}
//           style={chatOpen ? { display: "flex", flex: 1 } : undefined}
//         />
//         <div className="main__left" style={chatOpen ? { display: "none" } : undefined}>
//           <div className="videos__group">
//             <div id="video-grid">
//               {room.local && <Video stream={room.local} muted />}
//               {Object.entries(room.remote).map(([id, s]) => <Video key={id} stream={s} />)}
//             </div>
//           </div>
//           <div className="options">
//             <div className="options__left">
//               <div className={red(!room.camOn)} onClick={room.toggleCam}>
//                 <i className={`fas ${room.camOn ? "fa-video" : "fa-video-slash"}`} data-tooltip="Hide camera" />
//               </div>
//               <div className={red(!room.micOn)} onClick={room.toggleMic}>
//                 <i className={`fas ${room.micOn ? "fa-microphone" : "fa-microphone-slash"}`} data-tooltip="Mute" />
//               </div>
//               <div className={red(room.recording)} onClick={room.toggleRecording}>
//                 <i className={`fas ${room.recording ? "fa-stop-circle" : "fa-circle"}`} data-tooltip={room.recording ? "Stop recording" : "Recording"} />
//               </div>
//               <div className={red(room.sharing)} onClick={room.shareScreen}>
//                 <i className="fas fa-desktop" data-tooltip="Screen-share" />
//               </div>
//               <div id="showChat" className="options__button" onClick={() => setChatOpen(true)}>
//                 <i className="fa fa-comment" />
//               </div>
//             </div>
//             <div className="options__right">
//               <div className="options__button" onClick={invite}><i className="fas fa-user-plus" /></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {!name && (
//         <div className="name-modal">
//           <div>
//             <h2>Enter your name</h2>
//             <input autoFocus value={draft} placeholder="Your name" onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && join()} />
//             <button onClick={join}>Join</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { useParams } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";
import Navbar from "../components/Navbar";
import Video from "../components/Video";
import { useRoom } from "../hooks/useRoom";

export default function Room() {
  const { roomId = "" } = useParams();
  const [name, setName] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [chatOpen, setChatOpen] = useState(true);
  const room = useRoom(roomId, name);

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
              {room.local && (
                <Video stream={room.local} muted local label="You" />
              )}
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
                data-tooltip="Camera"
                aria-label="Toggle camera"
              >
                <i
                  className={`fas ${room.camOn ? "fa-video" : "fa-video-slash"}`}
                />
              </button>
              <button
                className={`dock__btn ${!room.micOn ? "dock__btn--off" : ""}`}
                onClick={room.toggleMic}
                data-tooltip="Microphone"
                aria-label="Toggle microphone"
              >
                <i
                  className={`fas ${room.micOn ? "fa-microphone" : "fa-microphone-slash"}`}
                />
              </button>
              <button
                className={`dock__btn ${room.recording ? "dock__btn--off" : ""}`}
                onClick={room.toggleRecording}
                data-tooltip={room.recording ? "Stop recording" : "Record"}
                aria-label="Toggle recording"
              >
                <i
                  className={`fas ${room.recording ? "fa-stop-circle" : "fa-circle"}`}
                />
              </button>
              <button
                className={`dock__btn ${room.sharing ? "dock__btn--active" : ""}`}
                onClick={room.shareScreen}
                data-tooltip="Screen share"
                aria-label="Share screen"
              >
                <i className="fas fa-desktop" />
              </button>
            </div>

            <div className="dock__group">
              <button
                className="dock__btn"
                onClick={invite}
                data-tooltip="Invite"
                aria-label="Copy invite link"
              >
                <i className="fas fa-user-plus" />
              </button>
              <button
                className={`dock__btn ${chatOpen ? "dock__btn--active" : ""}`}
                onClick={() => setChatOpen(true)}
                data-tooltip="Chat"
                aria-label="Open chat"
              >
                <i className="fa fa-comment" />
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
        />
      </div>

      {!name && (
        <div className="name-modal">
          <div className="name-modal__card">
            <h2>Enter your name</h2>
            <input
              autoFocus
              value={draft}
              placeholder="Your name"
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && join()}
            />
            <button className="btn btn--primary" onClick={join}>
              Join
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
