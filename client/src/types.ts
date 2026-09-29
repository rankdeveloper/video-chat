// Keep in sync with server/src/types.ts
export interface ChatMessage {
  text: string;
  userName: string;
  at: number;
}

export interface ServerToClientEvents {
  "user-connected": (userId: string) => void;
  "user-disconnected": (userId: string) => void;
  createMessage: (message: ChatMessage) => void;
}

export interface ClientToServerEvents {
  "join-room": (roomId: string, userId: string, userName: string) => void;
  message: (text: string) => void;
}
