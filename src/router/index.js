import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Dashboard from "@/components/Dashboard.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/",
    redirect: "/login", // Redirect root to login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
