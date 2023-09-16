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
    meta: { requiresAuth: true },
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        name: "HomePage",
        path: "/home",
        component: () => import("../pages/HomePage.vue"),
      },
     
    ],
  },
  //admin start
  //will need requiresAuth and parentchild routing later
  {
    name: "AdminHome",
    path: "/adm-home",
    component: () => import("../pages/AdminHome.vue"),
  },
  {
    name: "AdminBusinessList",
    path: "/adm-business-list",
    component: () => import("../pages/AdminBusinessList.vue"),
  },
  {
    name: "AdminCategoriesList",
    path: "/adm-cat-list",
    component: () => import("../pages/AdminCategoryList.vue"),
  },
  //admin end
  //bizOwner start
  {
    name: "BizOwnerSubmitEnquiries",
    path: "/biz-submit-enq",
    component: () => import("../pages/BizOwnerSubmitEnq.vue"),
  },
  {
    name: "BizOwnerTransactionHistory",
    path: "/biz-trans-hist",
    component: () => import("../pages/BizOwnerTransactionHist.vue"),
  },
  {
    name: "BizOwnerProductLists",
    path: "/biz-prod-lists",
    component: () => import("../pages/BizOwnerProductLists.vue"),
  },
  {
    name: "BizOwnerChart",
    path: "/biz-chart",
    component: () => import("../pages/BizOwnerChart.vue"),
  },
  // bizOwner end
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("../pages/ErrorNotFound.vue"),
  },
];

export default routes;
