import { defineStore } from "pinia";
import { ref } from "vue";
import { ProductDetails } from "./types";

export const useMemberStore = defineStore("member", () => {
  const date = new Date();
  const memberDetails = ref({
    user_id: "",
    user_email: "",
    user_password: "",
    user_name: "",
    user_dob: date.toISOString().split('T')[0], // YYYY-MM-DD
    user_phoneno: 0,
    user_address: "",
    user_country: "",
    user_gender: "",
    user_status: "",
    user_regdate: "",
  });

  const memberPreferences = ref({});
  const memberWishlist = ref({});


  return {
    memberDetails,
    memberPreferences,
    memberWishlist,
  }
});