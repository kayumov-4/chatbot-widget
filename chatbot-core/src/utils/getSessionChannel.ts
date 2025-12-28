import { getSessionId } from "./session";

export function getSessionChannel(): string {
  return `chat:${getSessionId()}`;
}
