import { defineStore } from "pinia";
import { ref } from "vue";
import { MemberDetails, MemberPreferences, MemberPastTransactions, ProductQuantity } from "./types";
import axios, { AxiosResponse } from "axios";
import { ProductDetails } from "../product/types";

export const useMemberStore = defineStore("member", () => {
  const memberDetails = ref<MemberDetails>({
    user_id: "",
    user_email: "",
    user_password: "",
    user_name: "",
    user_dob: "",
    user_phoneno: 0,
    user_address: "",
    user_country: "",
    user_gender: "",
  });
  const memberPreferences = ref<MemberPreferences[]>([]);
  const memberWishlist = ref<string[]>([]);
  const memberCart = ref<string[]>([]);

  const getMemberProfileDetailsByID = async (id: string) => {
    const response: AxiosResponse<MemberDetails> = await axios.get(`${import.meta.env.VITE_API_URL}/api/member/getById`, {
      params: {
        user_id: id
      }
    });
    memberDetails.value = response.data;
  };
  const getMemberPreferencesByID = async (id: string) => {
    const response: AxiosResponse<MemberPreferences[]> = await axios.get(`${import.meta.env.VITE_API_URL}/api/member/getPreference`, {
      params: {
        user_id: id
      }
    });
    memberPreferences.value = response.data;
  };
  const updateMemberProfile = async (req: MemberDetails) => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/member/editProfile`, {
      "user_id": req.user_id,
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
  const insertNewMemberPreferences = async (req: MemberPreferences) => {
    const response: AxiosResponse<{ preference_id: string }> = await axios.post(`${import.meta.env.VITE_API_URL}/api/member/addNewPref`, {
      "user_id": req.user_id,
      "cat_id": req.cat_id,
      "skill_level": req.skill_level,
      "frequency": req.frequency,
    });
    return response.data;
  }
  const deleteMemberPreferences = async (id: string) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/member/delPref`, {
      params: {
        "preference_id": id
      }
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
  const addProductToWishlist = async (req: { user_id: string, prod_id: string }) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/member/addNewWishlist`, {
      "user_id": req.user_id,
      "prod_id": req.prod_id
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
  const deleteProductFromWishlist = async (req: { user_id: string, prod_id: string }) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/member/delWish`, {
      params: {
        "user_id": req.user_id,
        "prod_id": req.prod_id
      }
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
  const getMemberWishlist = async (id: string) => {
    const response: AxiosResponse<{ user_id: string, prod_id: string }[]> = await axios.get(`${import.meta.env.VITE_API_URL}/api/member/getWishlist`, {
      params: {
        "user_id": id
      }
    });
    if (response.status === 200) {
      memberWishlist.value = Array.from(new Set(memberWishlist.value.concat(response.data.map(res => res.prod_id))))
    }
    return response.data;
  }
  const addProductToCart = async (req: { user_id: string, prod_id: string }) => {
    let response;
    try {
      response = await axios.post(`${import.meta.env.VITE_API_URL}/api/member/addToCart`, {
        "user_id": req.user_id,
        "prod_id": req.prod_id
      });
      return 1;
    } catch (error: any) {
      if (error?.response?.data.message == "Item already added to cart.") {
        return 0;
      } else {
        return -1;
      }
    }
  }
  const getMemberCart = async (id: string) => {
    const response: AxiosResponse<{ user_id: string, prod_id: string }[]> = await axios.get(`${import.meta.env.VITE_API_URL}/api/member/getCart`, {
      params: {
        user_id: id
      }
    });
    if (response.status === 200) {
      memberCart.value = response.data.map(res => res.prod_id)
      return memberCart.value;
    } else {
      return [];
    }
  }
  const deleteFromCart = async (req: { user_id: string, prod_id: string }) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/member/delCart`, {
      params: {
        "user_id": req.user_id,
        "prod_id": req.prod_id
      }
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
  const getMemberPastTransactions = async (id: string) => {
    const response: AxiosResponse<MemberPastTransactions[]> = await axios.get(`${import.meta.env.VITE_API_URL}/api/member/getTransaction`, {
      params: {
        user_id: id
      }
    });
    return response.data;
  }
  const memberSubmitProductRating = async (req: {
    user_id: string,
    prod_id: string,
    rating: number,
    remarks: string
  }) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/member/addNewRating`, {
      "user_id": req.user_id,
      "prod_id": req.prod_id,
      "rating": req.rating,
      "remarks": req.remarks
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
  const memberGetWishlist = async (id: string) => {
    const response: AxiosResponse<ProductDetails[]> = await axios.get(`${import.meta.env.VITE_API_URL}/api/member/getWishlist`, {
      params: {
        user_id: id
      }
    });
    return response.data;
  }
  const memberSendTransaction = async (req: {
    user_id: string,
    total_amount: number,
    prod_quantity: ProductQuantity[],
  }) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/member/memberSendTransaction`, req);
    if (response.status === 200) {
      memberCart.value = [];
      return true;
    } else {
      return false;
    }
  }
  const getMemberRegisteredCount = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/member/getAll`);
    if (response.status === 200) {
      console.log(response.data.length)
      return response.data.length;
    } else {
      return -1;
    }
  }
  return {
    memberDetails,
    memberPreferences,
    memberWishlist,
    updateMemberProfile,
    insertNewMemberPreferences,
    deleteMemberPreferences,
    getMemberProfileDetailsByID,
    getMemberPreferencesByID,
    addProductToWishlist,
    deleteProductFromWishlist,
    getMemberWishlist,
    addProductToCart,
    getMemberCart,
    deleteFromCart,
    getMemberPastTransactions,
    memberSubmitProductRating,
    memberGetWishlist,
    memberSendTransaction,
    getMemberRegisteredCount
  }
});