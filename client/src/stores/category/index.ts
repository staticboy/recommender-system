import { defineStore } from "pinia";
import { Category, SubCategory } from "./types";
import axios, { AxiosResponse } from "axios";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const categoryList = ref<Category[]>([]);
  const subCategoryList = ref<SubCategory[]>([]);

  const getAllCategories = async (active: boolean) => {
    const resp: AxiosResponse<Category[]> = await axios.get(`${import.meta.env.VITE_API_URL}/api/category/getCatAll`, {
      params: {
        active: active
      }
    });
    if (resp.status === 200) {
      categoryList.value = resp.data;
    } else {
      categoryList.value = [];
    }
    return categoryList.value;
  };
  const getAllSubCategories = async (active: boolean) => {
    const resp: AxiosResponse<SubCategory[]> = await axios.get(`${import.meta.env.VITE_API_URL}/api/category/getSubCatAll`, {
      params: {
        active: active
      }
    });
    if (resp.status === 200) {
      subCategoryList.value = resp.data;
    } else {
      subCategoryList.value = [];
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