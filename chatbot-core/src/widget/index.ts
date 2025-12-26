import "./define";
import { applyWidgetConfig } from "./applyConfig";

(function () {
  customElements.whenDefined("chat-widget").then(() => {
    const widget = document.createElement("chat-widget");

    applyWidgetConfig(widget);

    document.body.appendChild(widget);
  });
})();
