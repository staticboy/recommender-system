import { defineStore } from "pinia";
import { ref } from "vue";
import { BizProductDetails, BizProfileDetails, InsertEnquiryRequest, EditProductDetails } from "./types";
import axios, { AxiosResponse } from "axios";

export const useBizOwnerStore = defineStore("bizOwner", () => {
  const businessList = ref<BizProfileDetails[]>([]);
  const bizProfileDetails = ref<BizProfileDetails>({
    biz_id: '',
    biz_name: '',
    biz_email: '',
    biz_phoneno: 0,
    biz_yearest: 0,
    biz_address: '',
    biz_country: '',
    biz_zipcode: '',
    biz_description: '',
    cats: ''
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
    prod_id: ''
  });

  const getBizDetails = async (biz_id: string) => {
    const filter = businessList.value.find((biz) => biz.biz_id === biz_id);
    if (!filter) {
      const resp = await getBizOwnerProfileDetails(biz_id)
      bizProfileDetails.value = resp;
      return resp;
    } else {
      return filter;
    }
  }

  const getBizOwnerProfileDetails = async (biz_id: string) => {
    const resp = await axios.post<BizProfileDetails>(`${import.meta.env.VITE_API_URL}/api/business/getById`, { biz_id: biz_id });
    bizProfileDetails.value = resp.data;
    return resp.data;
  }

  const insertEnquiry = async (enq: InsertEnquiryRequest) => {
    const resp = await axios.post<boolean>(`${import.meta.env.VITE_API_URL}/api/enquiries/insertEnquiry`, enq);
    return resp.data;
  }

  const getAllBusinesses = async () => {
    const resp: AxiosResponse<BizProfileDetails[]> = await axios.get(`${import.meta.env.VITE_API_URL}/api/business/getAll`);
    businessList.value = resp.data;
    return resp.data;
  }

  return {
    bizProfileDetails,
    editProdDetails,
    selectedProdId,
    businessList,
    getBizDetails,
    getBizOwnerProfileDetails,
    insertEnquiry,
    getAllBusinesses,
  };
});

