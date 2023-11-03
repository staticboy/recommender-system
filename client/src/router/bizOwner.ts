export default {
  path: "/biz",
  component: () => import("../layouts/MainLayout.vue"),
  // meta: { requiresAuth: true, requiresBiz: true },
  children: [
    {
      name: "BizOwnerHome",
      path: "home",
      component: () => import("../pages/BizOwner/BizOwnerHome.vue"),
    },
    {
      name: "BizOwnerSubmitEnquiries",
      path: "submit-enq",
      component: () => import("../pages/BizOwner/BizOwnerSubmitEnq.vue"),
    },
    {
      name: "BizOwnerTransactionHistory",
      path: "trans-hist",
      component: () => import("../pages/BizOwner/BizOwnerTransactionHist.vue"),
    },
    {
      name: "BizOwnerProductLists",
      path: "prod-lists",
      component: () => import("../pages/BizOwner/BizOwnerProductLists.vue"),
    },
    {
      name: "BizOwnerInsights",
      path: "insights",
      component: () => import("../pages/BizOwner/BizOwnerInsights.vue"),
    },
    {
      name: "BizProfile",
      path: "profile",
      component: () => import("../pages/BizOwner/BizProfile.vue"),
    },
    {
      name: "BizProducts",
      path: "products",
      component: () => import("../pages/BizOwner/BizProducts.vue"),
    },
    {
      name: "BizProductsAll",
      path: "products-all",
      component: () => import("../pages/BizOwner/BizProductsAdd.vue"),
    },
    {
      name: "BizProductsForm",
      path: "products-form",
      component: () => import("../components/Modals/BizProdModal.vue"),
    },
  ]
}