import { getConfig } from "../config/getConfig";
import { getSessionChannel } from "../utils/channel";

export async function sendQuestion(question: string) {
  const { apiUrl, projectId } = getConfig();

  await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel_name: getSessionChannel(),
      question,
      request_id: crypto.randomUUID(),
      project_id: projectId,
    }),
  });
}
