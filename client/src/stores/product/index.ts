import { defineStore } from "pinia";
import { ref } from "vue";
import axios, { AxiosResponse } from "axios";

export const useProductStore = defineStore("product", () => {
  const getProductsByCategory = async (id: string) => {
  };
  const getProductsByBusiness = async (id: string) => {
  };
  const getProductByID = async (id: string) => {
  };

  return {
    getProductsByCategory,
    getProductsByBusiness,
    getProductByID,
  }
});