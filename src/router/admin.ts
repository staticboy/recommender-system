export default {
  path: "/admin",
  component: () => import("../layouts/MainLayout.vue"),
  // meta: { requiresAuth: true, requiresAdmin: true },
  children: [
    {
      name: "AdminHome",
      path: "home",
      component: () => import("../pages/Admin/AdminHome.vue"),
    },
    {
      name: "AdminBusinessList",
      path: "business-list",
      component: () => import("../pages/Admin/AdminBusinessList.vue"),
    },
    {
      name: "AdminBusinessProfile",
      path: "business-profile",
      component: () => import("../pages/Admin/AdminBusinessProfile.vue"),
    },
    {
      name: "AdminCategoriesList",
      path: "cat-list",
      component: () => import("../pages/Admin/AdminCategoryList.vue"),
    },
    {
      name: "AdminCategoryProfile",
      path: "cat-profile",
      component: () => import("../pages/Admin/AdminCategoryProfile.vue"),
    },
    {
      name: "AdminCategoryNewProfile",
      path: "cat-new",
      component: () => import("../pages/Admin/AdminCategoryNewProfile.vue"),
    },
    {
      name: "AdminPerformanceDashboard",
      path: "performance-dashboard",
      component: () => import("../pages/Admin/AdminPerformanceDashboard.vue"),
    },
    {
      name: "AdminCustomerList",
      path: "customer-list",
      component: () => import("../pages/Admin/AdminCustomerList.vue"),
    },
    {
      name: "AdminCustomerProfile",
      path: "customer-profile",
      component: () => import("../pages/Admin/AdminCustomerProfile.vue"),
    },
    {
      name: "AdminEnquiryList",
      path: "enquiry-list",
      component: () => import("../pages/Admin/AdminEnquiryList.vue"),
    },
    {
      name: "AdminEnquiryForm",
      path: "enquiry",
      component: () => import("../pages/Admin/AdminEnquiryForm.vue"),
    },
  ]
}