import { defineStore } from "pinia";
import { ref } from "vue";
import { BizProductDetails, BizProfileDetails, InsertEnquiryRequest } from "./types";
import { List } from "postcss/lib/list";

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

  const bizListProductDetails = ref<BizProductDetails>({

    prod_name: "",
    prod_description: "",
    prod_price: 0,
    prod_stockqty: 0,
    prod_modelnum: "",
    prod_status: "",
    cat_id: "",
    sub_cat: "",
    biz_id: ""

  })




  const getBizOwnerProfileDetails = async (biz_id: string) => {
    console.log(biz_id);
    const resp = await axios.post<BizProfileDetails>(`${import.meta.env.VITE_API_URL}/api/business/getById`, { biz_id: biz_id });
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

