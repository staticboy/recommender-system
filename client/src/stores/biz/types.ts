export interface InsertEnquiryRequest {
  enq_submitby: string;
  enq_subject: string;
  enq_message: string;
}

export interface BizProfileDetails {
  username: string;
  biz_name: string;
  biz_phoneno: number;
  email: string;
  yr_est: number;
  address: string;
  country: string;
  biz_desc: string;
}

export interface BizProductDetails {
  prod_name: string;
  prod_description: string;
  prod_price: number;
  prod_stockqty: number;
  prod_modelnum: string;
  prod_status: string;
  cat_id: string;
  sub_cat: string;
  biz_id: string;
}

export interface ediProductDetails {

  prod_id: string,
  updated_name: string,
  updated_description: string,
  updated_price: number,
  updated_stockqty: number,
  updated_modelnum: string
}