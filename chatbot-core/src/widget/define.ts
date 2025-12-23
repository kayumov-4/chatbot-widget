import { defineCustomElement } from "vue";
import ChatWidget from "../components/ChatWidget.vue";

const ChatWidgetElement = defineCustomElement(ChatWidget);

customElements.define("chat-widget", ChatWidgetElement);
