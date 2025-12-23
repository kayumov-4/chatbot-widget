import "./define";
import { getConfig } from "../config/getConfig";

(function () {
  if (document.querySelector("chat-widget")) return;

  const el = document.createElement("chat-widget");
  const config = getConfig();

  el.setAttribute("title", config.title);
  el.setAttribute("primary-color", config.primaryColor);
  el.setAttribute("position", config.position);
  el.setAttribute("z-index", String(config.zIndex));

  document.body.appendChild(el);
})();
