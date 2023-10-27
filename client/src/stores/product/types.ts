export interface ProductDetails {
  prod_id: string
  prod_name: string,
  prod_description: string,
  prod_price: number,
  prod_stockqty: number,
  prod_modelnum: string,
  cat_id: string,
  sub_cat: string,
  biz_id: string,
  prod_dateadded: Date,
  prod_status: string,
}
export interface ProductRecommendations {
  recommendations_activity: ProductDetails[],
  recommendations_pref: ProductDetails[],
}