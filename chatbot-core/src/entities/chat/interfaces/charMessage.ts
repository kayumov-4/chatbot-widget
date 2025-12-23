import type { ChatRole } from "../types/chatRole";

export interface ChatMessage {
  id: number;
  role: ChatRole;
  text: string;
}
