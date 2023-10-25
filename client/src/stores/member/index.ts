import { defineStore } from "pinia";
import { ref } from "vue";
import { MemberDetails, ProductDetails } from "./types";
import { DateTime } from "luxon";

export const useMemberStore = defineStore("member", () => {
  const date = DateTime.now()
  const memberDetails = ref<MemberDetails>({
    user_id: "",
    user_email: "",
    user_password: "",
    user_name: "",
    user_dob: date.toFormat("yyyy-MM-dd"),
    user_phoneno: 0,
    user_address: "",
    user_country: "",
    user_gender: "",
  });

  const memberPreferences = ref({});
  const memberWishlist = ref({});

  return {
    memberDetails,
    memberPreferences,
    memberWishlist,
  }
});