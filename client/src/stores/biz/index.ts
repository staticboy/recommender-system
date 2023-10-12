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
    prod_modelnum: 0,
    cat_id: "",
    sub_cat: "",
    biz_id: ""

  })




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

