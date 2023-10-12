import { defineStore } from "pinia";
import { ref } from "vue";
import { BizProfileDetails, InsertEnquiryRequest } from "./types";

export const useBizOwnerStore = defineStore("bizOwner", () => {
  const bizProfileDetails = ref<BizProfileDetails>({
    username: "",
    biz_name: "",
    biz_phoneno: 0,
    email: "",
    yr_est: 0,
    address: "",
    country: "",
    biz_desc: "",
  });

  const getBizOwnerProfileDetails = async (biz_id: string) => {
    const resp = await axios.post<BizProfileDetails>("http://localhost:3000/api/business/getProfile", { biz_id: biz_id });
    bizProfileDetails.value = resp.data;
  }

  const insertEnquiry = async (enq: InsertEnquiryRequest) => {
    const resp = await axios.post<boolean>("http://localhost:3000/api/enquiries/insertEnquiry", enq);
    return resp.data;
  }

  return {
    bizProfileDetails,
    getBizOwnerProfileDetails,
    insertEnquiry,
  };
});

