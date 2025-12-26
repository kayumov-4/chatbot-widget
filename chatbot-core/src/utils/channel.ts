import { getSessionId } from "./session";

export function getSessionChannel(): string {
  return `chatbot:session:${getSessionId()}`;
}
