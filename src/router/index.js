import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import AdminPage from "../layouts/Admin.vue";
import PracticeView from "../views/PracticeView.vue";
import StudentView from "../views/StudentView.vue";
import SAdminView from "../views/AdminView.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/admin",
    component: AdminPage,
    children: [
      {
        path: "/admin/practice",
        name: "practice",
        component: PracticeView,
      },
      {
        path: "/admin/student",
        name: "student",
        component: StudentView,
      },
      {
        path: "/admin/superAdmin",
        name: "superAdmin",
        component: SAdminView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
