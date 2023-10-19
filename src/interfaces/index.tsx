import { To } from "react-router-dom";

export interface IPagination {
  page: number;
  limit: number;
}
export interface IProductFilter extends IPagination {
  listCategory: Array<string>;
}
export interface IPaginationRequest {
  skip: number;
  limit: number;
}
export interface ISelect {
  value: string;
  label: string;
}
export interface ITokenInfo {
  exp: number;
  iat: number;
  sub: number;
  username: string;
}
export interface NavigateFunction {
  navigate: (to: To) => void;
  (delta: number): void;
}