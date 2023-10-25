import { defineStore } from "pinia";
import { SignUpDetails, SignUpResponse } from "./types";
import axios, { AxiosResponse } from "axios";

export const useGuestStore = defineStore("guest", () => {
  const memberSignUp = async (req: SignUpDetails) => {
    const resp: AxiosResponse<SignUpResponse> = await axios.post(`${import.meta.env.VITE_API_URL}/api/member/addNewMember`, {
      "user_email": req.email,
      "user_password": req.password,
      "user_name": req.name,
      "user_dob": req.dob,
      "user_phoneno": req.phoneno,
      "user_address": req.address,
      "user_country": req.country,
      "user_gender": req.gender,
      "user_status": req.status,
    });
    return resp.data;
  };
  const businessSignUp = async (req: SignUpDetails) => {
    const resp: AxiosResponse<SignUpResponse> = await axios.post(`${import.meta.env.VITE_API_URL}/api/business/addNewBusiness`, {
      "biz_email": req.email,
      "biz_password": req.password,
      "biz_name": req.name,
      "biz_description": req.description,
      "biz_yearest": req.dateEst,
      "biz_phoneno": req.phoneno,
      "biz_address": req.address,
      "biz_country": req.country,
    });
    return resp.data;
  };

  return {
    memberSignUp,
    businessSignUp,
  };
});