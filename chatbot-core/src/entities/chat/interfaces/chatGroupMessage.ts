import type { ChatRole } from "../types/chatRole";
import type { ChatMessage } from "./chatMessage";

export interface ChatGroupMessage {
  id: string;
  role: ChatRole;
  author: string;
  createdAt: number;
  messages: ChatMessage[];
}
