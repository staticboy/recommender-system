import { defineStore } from "pinia";
import { ref } from "vue";
import { LoginCredentials, LoginResponse } from "./types";
import axios, { AxiosResponse } from "axios";

export const useUserStore = defineStore("guest", () => {
  const login = async (login: LoginCredentials) => {
    const resp: AxiosResponse<LoginResponse> = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, login);
    // set user role and user id in local storage
    return resp.data;
  }

  const dateUtils = async (param : string) => {

    return param ;
  } 

  return {
    login,
    dateUtils
  };
});