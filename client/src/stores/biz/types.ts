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
  biz_zipcode: string;
  biz_description: string;
  cats: string;
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

export interface EditProductDetails {
  prod_id: string,
  cat_id: string,
  sub_cat: string,
  prod_name: string,
  prod_description: string,
  prod_price: number,
  prod_stockqty: number,
  prod_modelnum: string,
  prod_status: string,
}