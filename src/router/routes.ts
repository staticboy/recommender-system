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
      //Member Pages
      {
        name: "MemberWishlist",
        path: "/user/wishlist",
        component: () => import("../pages/MemberWishlist.vue"),
      },
      {
        name: "MemberTransactions",
        path: "/user/transactions",
        component: () => import("../pages/MemberTransactions.vue"),
      },
      {
        name: "MemberEnquiry",
        path: "/user/enquiry",
        component: () => import("../pages/MemberEnquiry.vue"),
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
    name: "AdminBusinessProfile",
    path: "/adm-business-profile",
    component: () => import("../pages/AdminBusinessProfile.vue"),
  },
  {
    name: "AdminCategoriesList",
    path: "/adm-cat-list",
    component: () => import("../pages/AdminCategoryList.vue"),
  },
  {
    name: "AdminCategoryProfile",
    path: "/adm-cat-profile",
    component: () => import("../pages/AdminCategoryProfile.vue"),
  },
  {
    name: "AdminCategoryNewProfile",
    path: "/adm-cat-new",
    component: () => import("../pages/AdminCategoryNewProfile.vue"),
  },
  {
    name: "AdminPerformanceDashboard",
    path: "/adm-performance-dashboard",
    component: () => import("../pages/AdminPerformanceDashboard.vue"),
  },
  {
    name: "AdminCustomerList",
    path: "/adm-customer-list",
    component: () => import("../pages/AdminCustomerList.vue"),
  },
  {
    name: "AdminCustomerProfile",
    path: "/adm-customer-profile",
    component: () => import("../pages/AdminCustomerProfile.vue"),
  },
  {
    name: "AdminEnquiryList",
    path: "/adm-enquiry-list",
    component: () => import("../pages/AdminEnquiryList.vue"),
  },
  {
    name: "AdminEnquiryForm",
    path: "/adm-enquiry",
    component: () => import("../pages/AdminEnquiryForm.vue"),
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
