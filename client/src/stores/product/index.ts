import { defineStore } from "pinia";
import { ref } from "vue";
import { ProductDetails, ProductRecommendations } from "./types"
import axios, { AxiosResponse } from "axios";

export const useProductStore = defineStore("product", () => {
  // stores all initialised products
  const productList = ref<ProductDetails[]>([]);
  const activityProductRecommendations = ref<ProductDetails[]>([]);
  const preferenceProductRecommendations = ref<ProductDetails[]>([]);

  const getProductDetail = async (id: string) => {
    const res = productList.value.find((product) => product.prod_id === id);
    if (!res) {
      const resp = await getProductByID(id);
      return resp;
    } else {
      return res
    }
  }

  const getProductsByCategory = async (id: string) => {
    const resp: AxiosResponse<ProductDetails[]> = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/getByCatId`, {
      cat_id: id
    });
    if (resp.status === 200) {
      productList.value = productList.value.concat(resp.data);
      // filter out duplicates by prod_id
      productList.value = productList.value.filter((product, index, self) =>
        index === self.findIndex((p) => (
          p.prod_id === product.prod_id
        ))
      )
      return resp.data;
    } else {
      return [];
    }
  };
  const getProductsByBusiness = async (id: string) => {
    const resp: AxiosResponse<ProductDetails[]> = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/getByBizId`, {
      biz_id: id
    });
    if (resp.status === 200) {
      productList.value = productList.value.concat(resp.data);
      // filter out duplicates by prod_id
      productList.value = productList.value.filter((product, index, self) =>
        index === self.findIndex((p) => (
          p.prod_id === product.prod_id
        ))
      )
      return resp.data;
    } else {
      return [];
    }
  };
  const getProductByID = async (id: string) => {
    const resp: AxiosResponse<ProductDetails> = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/getById`, {
      prod_id: id
    });
    if (resp.status === 200) {
      productList.value = productList.value.concat(resp.data);
      // filter out duplicates by prod_id
      productList.value = productList.value.filter((product, index, self) =>
        index === self.findIndex((p) => (
          p.prod_id === product.prod_id
        ))
      )
      return resp.data;
    } else {
      return {} as ProductDetails;
    }
  };
  const getProductRecommendations = async (id: string) => {
    const resp: AxiosResponse<ProductRecommendations> = await axios.get(`http://104.128.64.150:8080/api/v1/recommendations?user_id=${id}`);
    activityProductRecommendations.value = resp.data.recommendations_activity;
    preferenceProductRecommendations.value = resp.data.recommendations_pref;
  }
  return {
    productList,
    activityProductRecommendations,
    preferenceProductRecommendations,
    getProductDetail,
    getProductsByCategory,
    getProductsByBusiness,
    getProductRecommendations,
  }
});