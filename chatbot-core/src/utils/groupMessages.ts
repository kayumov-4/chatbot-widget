import type { ChatMessage } from "../entities/chat/interfaces/chatMessage";

const ONE_MINUTE = 60 * 1000;

export function groupMessages(messages: ChatMessage[]) {
  const result: any[] = [];

  for (const msg of messages) {
    const lastGroup = result[result.length - 1];

    if (
      lastGroup &&
      lastGroup.role === msg.role &&
      Math.abs(msg.createdAt - lastGroup.createdAt) <= ONE_MINUTE
    ) {
      lastGroup.messages.push(msg);
    } else {
      result.push({
        id: String(msg.id),
        role: msg.role,
        author: msg.author,
        createdAt: msg.createdAt,
        messages: [msg],
      });
    }
  }

  return result;
}
