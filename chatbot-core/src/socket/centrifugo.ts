import { getConfig } from "../config/getConfig";
import { loadScript } from "../utils/loadScript";

let centrifuge: any = null;
let isConnected = false;

export async function connectCentrifugo(token?: string) {
  if (isConnected) return;

  const { websocketUrl } = getConfig();

  try {
    await loadScript("https://unpkg.com/centrifuge@5.4.0/dist/centrifuge.js");
  } catch (err) {
    console.error(err);
    return;
  }

  const Centrifuge = (window as any).Centrifuge;

  if (!Centrifuge) {
    console.error("[Chatbot] Centrifuge is not available on window");
    return;
  }

  centrifuge = new Centrifuge(websocketUrl, { token });
  centrifuge.connect();
  isConnected = true;
}

export function subscribeChannel(
  channel: string,
  onMessage: (data: any) => void
) {
  if (!centrifuge) {
    console.warn("[Chatbot] Centrifugo is not connected");
    return;
  }

  const sub = centrifuge.newSubscription(channel);

  sub.on("publication", (ctx: any) => {
    onMessage(ctx.data);
  });

  sub.subscribe();
}
