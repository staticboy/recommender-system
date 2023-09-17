export default {
  path: "/user",
  component: () => import("../layouts/MainLayout.vue"),
  // meta: { requiresAuth: true, requiresMember: true },
  children: [
    {
      name: "HomePage",
      path: "home",
      component: () => import("../pages/Member/HomePage.vue"),
    },
    {
      name: "ViewProfilePage",
      path: "profile",
      component: () => import("../pages/Member/ProfilePage.vue"),
    },
    {
      name: "MemberWishlist",
      path: "wishlist",
      component: () => import("../pages/Member/MemberWishlist.vue"),
    },
    {
      name: "MemberTransactions",
      path: "transactions",
      component: () => import("../pages/Member/MemberTransactions.vue"),
    },
    {
      name: "MemberEnquiry",
      path: "enquiry",
      component: () => import("../pages/Member/MemberEnquiry.vue"),
    },
    {
      name: "SearchBusinessPage",
      path: "search",
      component: () => import("../pages/Member/SearchBusinessPage.vue"),
    },
    {
      name: "ProductREcommendationPage",
      path: "recommendation",
      component: () => import("../pages/Member/ProductRecommendationPage.vue"),
    },
  ]
}