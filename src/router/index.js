import { createRouter, createWebHistory } from "vue-router"
import store from "../store"
import LoginView from "../views/LoginView.vue"
import AdminPage from "../layouts/Admin.vue"
import PracticeView from "../views/PracticeView.vue"
import StudentView from "../views/StudentView.vue"
import SAdminView from "../views/AdminView.vue"
import ErrorView from "../views/ErrorView.vue"
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
        beforeEnter: () => {
          if (store.state.admin.type === "admin") {
            alert("일반관리자가 아닙니다")
            history.back()
          }
        },
      },
      {
        path: "/admin/student",
        name: "student",
        component: StudentView,
        beforeEnter: () => {
          if (store.state.admin.type === "admin") {
            alert("일반관리자가 아닙니다")
            history.back()
          }
        },
      },
      {
        path: "/admin/superAdmin",
        name: "superAdmin",
        component: SAdminView,
        beforeEnter: () => {
          if (store.state.admin.type === "manager") {
            alert("슈퍼관리자가 아닙니다")
            history.back()
          }
        },
      },
    ],
  },
  {
    path: "/error",
    name: "error",
    component: ErrorView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
