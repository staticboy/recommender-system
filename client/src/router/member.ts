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
      name: "BusinessSearchPage",
      path: "business-search",
      component: () => import("../pages/Member/BusinessSearchPage.vue"),
    },
    {
      name: "ProductSearchPage",
      path: "product-search",
      component: () => import("../pages/Member/ProductSearchPage.vue"),
    },
    {
      name: "ShoppingCartPage",
      path: "cart",
      component: () => import("../pages/Member/ShoppingCartPage.vue"),
    },
  ]
}