import { getConfig } from "../config/getConfig";
import { getSessionChannel } from "../utils/getSessionChannel";
import { getClientId } from "../utils/getClientId";

export async function sendQuestion(question: string) {
  const { apiUrl } = getConfig();

  try {
    const res = await fetch(`${apiUrl}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          localStorage.getItem("chatbot_access_token") || ""
        }`,
      },
      body: JSON.stringify({
        channel_name: getSessionChannel(),
        user_name: getClientId(),
        question,
        request_id: crypto.randomUUID(),
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Request failed: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ sendQuestion error:", err);
    throw err;
  }
}
