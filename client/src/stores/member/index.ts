import { defineStore } from "pinia";
import { ref } from "vue";
import { MemberDetails, MemberPreferences } from "./types";
import axios, { AxiosResponse } from "axios";

export const useMemberStore = defineStore("member", () => {
  const memberDetails = ref<MemberDetails>();
  const memberPreferences = ref<MemberPreferences[]>([]);
  const memberWishlist = ref();

  const getMemberProfileDetailsByID = async (id: string) => {
    const response: AxiosResponse<MemberDetails> = await axios.post(`${import.meta.env.VITE_API_URL}/api/member/getById`, {
      user_id: id
    });
    memberDetails.value = response.data;
  };
  const getMemberPreferencesByID = async (id: string) => {
    // getPreference
    const response: AxiosResponse<MemberPreferences[]> = await axios.post(`${import.meta.env.VITE_API_URL}/api/member/getPreference`, {
      user_id: id
    });
    memberPreferences.value = response.data;
  };
  const updateMemberProfile = async (req: MemberDetails) => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/member/updateMemberProfileInfo`, {
      "user_email": req.user_email,
      "user_dob": req.user_dob,
      "user_phoneno": req.user_phoneno,
      "user_address": req.user_address,
      "user_country": req.user_country,
      "user_gender": req.user_gender,
      "user_status": "ACTIVE"
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  };
  const updateMemberPreference = async (req: MemberPreferences) => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/member/updateMemberPreferenceInfo`, {
      // 
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  };

  return {
    memberDetails,
    memberPreferences,
    memberWishlist,
    getMemberProfileDetailsByID,
    getMemberPreferencesByID,
  }
});