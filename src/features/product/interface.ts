import { IPaginationRequest } from "interfaces";

export interface productState {
  isLoading: boolean;
  error: string;
  productList:Array<IProduct>;
  total:number;
  categoryList:Array<ICategory>
}
export interface ICategory{
  category:string
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
}
export interface IGetProductListPayload extends IPaginationRequest{
  category:string
}
export interface IResponseProductWithPage{
  response:Array<IResponseProducts>;
  page:number
}
export interface IResponseProducts{
  products:Array<IProduct>;
  summary:ISummary
}
export interface ISummary{
  count:number
}
export interface IResponseCategory{
  categories:Array<ICategory>;
}