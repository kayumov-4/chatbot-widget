import { getConfig } from "../config/getConfig";
import { getSessionChannel } from "../utils/getSessionChannel";
import { getClientId } from "../utils/getClientId";
import { loadScript } from "../utils/loadScript";

let centrifuge: any = null;
let subscriptions = new Map<string, any>();

export async function connectCentrifugo() {
  if (centrifuge) return centrifuge;

  const { websocketUrl, apiUrl } = getConfig();

  await loadScript("https://unpkg.com/centrifuge@5.4.0/dist/centrifuge.js");

  const Centrifuge = (window as any).Centrifuge;
  if (!Centrifuge) throw new Error("Centrifuge not loaded");

  const clientId = getClientId();

  const res = await fetch(`${apiUrl}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
    }),
  });

  const { access_token } = await res.json();
  localStorage.setItem("chatbot_access_token", access_token);

  centrifuge = new Centrifuge(websocketUrl, {
    token: access_token,
  });

  centrifuge.on("connected", (_: any) => {
    // console.log("🟢 Connected to Centrifugo", ctx);
  });

  centrifuge.on("disconnected", (_: any) => {
    // console.warn("🔴 Disconnected", ctx);
  });

  centrifuge.connect();

  return centrifuge;
}
export function subscribeChannel(
  channel: string,
  onChunk: (data: any) => void
) {
  if (!centrifuge) {
    // console.warn("❗ Centrifuge not connected yet");
    return;
  }
  const channelName = getSessionChannel();
  if (subscriptions.has(channelName)) return;

  const sub = centrifuge.newSubscription(channel);
  // console.log("🔔 Subscribing to channel:", channel);

  sub.on("publication", (ctx: any) => {
    // console.log("📨 Message received:", ctx.data);
    onChunk(ctx.data);
  });

  sub.on("subscribed", () => {
    // console.log("📡 Subscribed:", channel);
  });

  sub.on("error", (err: any) => {
    console.error("❌ Subscription error:", err);
  });

  sub.on("unsubscribed", () => {
    subscriptions.delete(channel);
  });

  sub.subscribe();
  subscriptions.set(channel, sub);
}
