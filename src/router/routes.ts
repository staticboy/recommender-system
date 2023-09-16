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
    ],
  },
  {
    path: "",
    meta: { requiresAuth: false },
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        name: "HomePage",
        path: "/home",
        component: () => import("../pages/HomePage.vue"),
      },
      //Member Pages
      {
        name: "MemberProfile",
        path: "/user/products",
        component: () => import("../pages/MemberProducts.vue"),
      },
      //Business Owner Pages
      {
        name: "BizProfile",
        path: "/biz/profile",
        component: () => import("../pages/BizProfile.vue"),
      },
      {
        name: "BizProducts",
        path: "/biz/products",
        component: () => import("../pages/BizProducts.vue"),
      },
      {
        name: "BizProductsAll",
        path: "/biz/products-all",
        component: () => import("../pages/BizProductsAdd.vue"),
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
