import { defineStore } from "pinia";
import { Category, SubCategory } from "./types";
import axios, { AxiosResponse } from "axios";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const categoryList = ref<Category[]>([]);
  const subCategoryList = ref<SubCategory[]>([]);

  const getAllCategories = async (active: boolean) => {
    // getCatAll
  };
  const getAllSubCategories = async (active: boolean) => {
    // getSubCatAll, getSubCategoryActive
  };
  return {
    categoryList,
    subCategoryList,
    getAllCategories,
    getAllSubCategories
  }
});