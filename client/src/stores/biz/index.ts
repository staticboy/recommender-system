import { defineStore } from "pinia";
import { ref } from "vue";
import { BizProductDetails, BizProfileDetails, InsertEnquiryRequest, EditProductDetails } from "./types";
import { List } from "postcss/lib/list";

export const useBizOwnerStore = defineStore("bizOwner", () => {
  const bizProfileDetails = ref<BizProfileDetails>({
    biz_id: '',
    biz_name: '',
    biz_email: '',
    biz_phoneno: 0,
    biz_yearest: 0,
    biz_address: '',
    biz_country: '',
    biz_description: ''
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

  const editProdDetails = ref<EditProductDetails>({
    prod_id: '',
    cat_id: '',
    sub_cat: '',
    prod_name: '',
    prod_description: '',
    prod_price: 0,
    prod_stockqty: 0,
    prod_modelnum: '',
    prod_status: '',
  })

  const selectedProdId = ref({
    prod_id : ''
  });


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
    editProdDetails,
    selectedProdId,
  };
});

