import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../layouts/NoLoginLayout.vue"),
    redirect: {
      path: "/login",
    },
    children: [
      {
        name: "LoginPage",
        path: "/login",
        component: () => import("../pages/LoginPage.vue"),
        meta: {
          noNav: true,
        },
      },
      {
        name: "SignUpPage",
        path: "/signup",
        component: () => import("../pages/SignUpPage.vue"),
        meta: {
          noNav: true,
        },
      },
    ],
  },
  {
    path: "",
    // meta: { requiresAuth: true },
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        name: "HomePage",
        path: "/home",
        component: () => import("../pages/HomePage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("../pages/ErrorNotFound.vue"),
  },
];

export default routes;
