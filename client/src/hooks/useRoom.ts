import { useCallback, useEffect, useRef, useState } from "react";
import Peer, { MediaConnection } from "peerjs";
import { io, Socket } from "socket.io-client";
import type {
  ChatMessage,
  ClientToServerEvents,
  ServerToClientEvents,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3030";
const iceServers: RTCIceServer[] = [{ urls: "stun:stun.l.google.com:19302" }];
if (import.meta.env.VITE_TURN_URL) {
  iceServers.push({
    urls: import.meta.env.VITE_TURN_URL,
    username: import.meta.env.VITE_TURN_USER,
    credential: import.meta.env.VITE_TURN_PASS,
  });
}
const secure = location.protocol === "https:";

export function useRoom(roomId: string, userName: string | null) {
  const [local, setLocal] = useState<MediaStream | null>(null);
  const [remote, setRemote] = useState<Record<string, MediaStream>>({});
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");

  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const callsRef = useRef(new Map<string, MediaConnection>());
  const recorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (!userName) return;
    let cancelled = false;
    const calls = callsRef.current;
    // const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
      io(API_URL);
    // const peer = new Peer({
    //   host: location.hostname,
    //   port: Number(location.port) || (secure ? 443 : 80),
    //   path: "/peerjs",
    //   secure,
    //   config: { iceServers },
    // });

    const peer = new Peer({
      host: new URL(API_URL).hostname,
      port: Number(new URL(API_URL).port) || (new URL(API_URL).protocol === "https:" ? 443 : 80),
      path: "/peerjs",
      secure: new URL(API_URL).protocol === "https:",
      config: { iceServers },
    });
    socketRef.current = socket;

    const addRemote = (id: string, s: MediaStream) =>
      setRemote((r) => ({ ...r, [id]: s }));
    const removeRemote = (id: string) => {
      calls.delete(id);
      setRemote(({ [id]: _gone, ...rest }) => rest);
    };
    const track = (call: MediaConnection) => {
      calls.set(call.peer, call);
      call.on("stream", (s) => addRemote(call.peer, s));
      call.on("close", () => removeRemote(call.peer));
    };

    socket.on("createMessage", (m) => setMessages((prev) => [...prev, m]));
    socket.on("user-disconnected", (id) => {
      calls.get(id)?.close();
      removeRemote(id);
    });

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        if (cancelled) return stream.getTracks().forEach((t) => t.stop());
        streamRef.current = stream;
        setLocal(stream);

        peer.on("call", (call) => {
          call.answer(stream);
          track(call);
        });
        socket.on("user-connected", (id) => track(peer.call(id, stream)));

        const join = (id: string) =>
          socket.emit("join-room", roomId, id, userName);
        if (peer.open && peer.id) join(peer.id);
        else peer.once("open", join);
      })
      .catch(() =>
        setError("Camera and microphone access is required to join the call."),
      );

    return () => {
      cancelled = true;
      recorderRef.current?.state === "recording" && recorderRef.current.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      calls.clear();
      peer.destroy();
      socket.disconnect();
      setRemote({});
      setLocal(null);
    };
  }, [roomId, userName]);

  const sendMessage = useCallback((text: string) => {
    if (text.trim()) socketRef.current?.emit("message", text);
  }, []);

  const toggleMic = () => {
    const t = streamRef.current?.getAudioTracks()[0];
    if (t) setMicOn((t.enabled = !t.enabled));
  };
  const toggleCam = () => {
    const t = streamRef.current?.getVideoTracks()[0];
    if (t) setCamOn((t.enabled = !t.enabled));
  };

  const swapVideoTrack = (t: MediaStreamTrack) =>
    callsRef.current.forEach((c) =>
      c.peerConnection
        .getSenders()
        .find((s) => s.track?.kind === "video")
        ?.replaceTrack(t),
    );

  const shareScreen = async () => {
    const cam = streamRef.current;
    if (!cam || sharing) return;
    try {
      const screen = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const screenTrack = screen.getVideoTracks()[0];
      swapVideoTrack(screenTrack);
      setLocal(new MediaStream([screenTrack, ...cam.getAudioTracks()]));
      setSharing(true);
      screenTrack.onended = () => {
        swapVideoTrack(cam.getVideoTracks()[0]);
        setLocal(cam);
        setSharing(false);
      };
    } catch {
      /* user cancelled the picker */
    }
  };

  const toggleRecording = () => {
    if (recorderRef.current?.state === "recording")
      return recorderRef.current.stop();
    if (!streamRef.current) return;
    const chunks: Blob[] = [];
    const rec = new MediaRecorder(streamRef.current);
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    rec.onstop = () => {
      const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType }));
      const a = Object.assign(document.createElement("a"), {
        href: url,
        download: "recorded_file.webm",
      });
      a.click();
      URL.revokeObjectURL(url);
      setRecording(false);
    };
    rec.start();
    recorderRef.current = rec;
    setRecording(true);
  };

  return {
    local,
    remote,
    messages,
    micOn,
    camOn,
    sharing,
    recording,
    error,
    sendMessage,
    toggleMic,
    toggleCam,
    shareScreen,
    toggleRecording,
  };
}
