import { defineStore } from "pinia";
import { CategoryDetails, SubCategoryDetails } from "./types";
import axios, { AxiosResponse } from "axios";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const categoryList = ref<CategoryDetails[]>([]);
  const subCategoryList = ref<SubCategoryDetails[]>([]);

  const getAllCategories = async () => {
    const resp: AxiosResponse<CategoryDetails[]> = await axios.get(`${import.meta.env.VITE_API_URL}/api/category/getCatAll`);
    if (resp.status === 200) {
      categoryList.value = resp.data;
    } else {
      return resp.data;
    }
    return categoryList.value;
  };
  const getAllSubCategories = async (active: boolean) => {
    const resp: AxiosResponse<SubCategoryDetails[]> = await axios.get(`${import.meta.env.VITE_API_URL}/api/category/getSubCatAll`, {
      params: {
        active: active
      }
    });
    if (resp.status === 200) {
      subCategoryList.value = resp.data;
    } else {
      return resp.data;
    }
    return subCategoryList.value;
  };
  return {
    categoryList,
    subCategoryList,
    getAllCategories,
    getAllSubCategories
  }
});