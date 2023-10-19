import {  IPaginationRequest } from "interfaces";
import { axiosRequest } from "utils/axiosRequest";
import { IGetProductListPayload } from "./interface";

const factories = {
  getProductList:(data:IPaginationRequest)=>{
    return axiosRequest({
      method: "get",
      url: `/catalog/products?limit=${data.limit}&skip=${data.skip}`,
    });
  },
  getProductListByCategory:(data:IGetProductListPayload)=>{
    return axiosRequest({
      method: "get",
      url: `/catalog/category/${data.category}/products?limit=${data.limit}&skip=${data.skip}`,
    });
  },
  getCategoryList:()=>{
    return axiosRequest({
      method: "get",
      url: `/catalog/categories`,
    });
  },
}
export default factories;