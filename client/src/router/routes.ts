import { RouteRecordRaw } from "vue-router";
import admin from "./admin";
import bizOwner from "./bizOwner";
import member from "./member";

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
      // {
      //   name: "GuestLandingPage",
      //   path: "/",
      //   component: () => import("../pages/Guest/GuestLandingPage.vue"),
      //   meta: {
      //     noNav: true,
      //   },
      // },
      {
        name: "GuestInfoPage",
        path: "/",
        component: () => import("../pages/Guest/GuestInfoPage.vue"),
        meta: {
          noNav: true,
        },
      }
    ],
  },
  {
    path: "/",
    meta: { requiresAuth: true },
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      //Member Pages
      member,
      //Business Owner Pages
      bizOwner,
      // admin pages
      admin,
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
