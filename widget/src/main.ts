import { createApp } from "vue";
import Playground from "@/views/Playground/index.vue";
import App from "./App.vue";
import { setup } from "@/utils/bootstrap";

import "animate.css";
import "@/assets/css/tailwind.css";
import "@/assets/css/font.css";

setup({
  onProduction: () => {
    createApp(App).mount("#app");
  },
  onDevelopment: () => {
    createApp(Playground).mount("#app");
  },
});
