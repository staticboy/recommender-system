export interface InsertEnquiryRequest {
  enq_submitby: string;
  enq_subject: string;
  enq_message: string;
}

export interface BizProfileDetails {
  biz_id: string;
  biz_name: string;
  biz_email: string;
  biz_phoneno: number;
  biz_yearest: number;
  biz_address: string;
  biz_country: string;
  biz_description: string;
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