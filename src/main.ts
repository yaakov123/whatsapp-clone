import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Application from "./pages/Application.vue";
import { account, client } from "./api/index";
import { createPinia } from "pinia";
import { useMessageStore } from "./stores/messageStore";

const routes: RouteRecordRaw[] = [
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" },
  { path: "/app", component: Application, name: "application" },
];

const router = createRouter({ history: createWebHistory(), routes });

const accountRoutes = ["login", "register"];

router.beforeEach(async (to, from, next) => {
  const name = to.name as string;

  try {
    const session = await account.getSession("current");
    to.meta.session = session;

    if (accountRoutes.includes(name)) {
      return next({ name: "application" });
    }
  } catch {
    if (!accountRoutes.includes(name)) {
      return next({ name: "login" });
    }
  }

  next();
});

const pinia = createPinia();
createApp(App).use(router).use(pinia).mount("#app");
