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
export interface RankedProdPerCat {
  cat_id: string,
  prod_id: string,
  prod_name: string,
  prod_description: string,
  prod_price: number,
  prod_stockqty: number,
  prod_modelnum: string,
  sub_cat: string,
  biz_id: string,
  prod_status: string,
  prod_dateadded: Date,
  buys: number,
}
export interface ProductRecommendations {
  recommendations_activity: ProductDetails[],
  recommendations_pref: ProductDetails[],
}