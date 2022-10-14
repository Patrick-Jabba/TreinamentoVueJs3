import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home/index.vue");
const Feedbacks = () => import("../views/Feedbacks/indexView.vue");
const Credentials = () => import("../views/Credentials/indexView.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/feedbacks",
    name: "Feedbacks",
    component: Feedbacks,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/credentials",
    name: "Credentials",
    component: Credentials,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
