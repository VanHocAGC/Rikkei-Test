import { ICategory } from 'features/product/interface';
import { ISelect } from 'interfaces';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const cx = (...className: Array<any>) =>
  className.filter(Boolean).join(' ');
export const ToSelectOption = (list: Array<ICategory>) => {
  return list.map((item) => {
    return {
      value: item.category,
      label: item.category,
    };
  });
};
export const SelectOptionToValue = (list: Array<ISelect>) => {
  return list.map((item) => item.value);
};
export const UrlToArray = (query: string | null) => {
  if (query) {
    const listCategory = query.split('%2C');
    return listCategory.map((item) => {
      return {
        value: item,
        label: item,
      };
    });
  }
  return [];
};
export const SelectOptionToString = (list: Array<ISelect>) => {
  const newArray = SelectOptionToValue(list);
  return newArray.toString();
};
export const CheckExpiredJWT = (token: string) => {
  let value:any = jwtDecode(token);
  return {
    isExpired: value.exp < new Date().getTime() / 1000,
  };
};
export const HandleToken = (token:string, expires:number) => {
  // var expireDate = new Date(expires*1000);
  // Cookies.set('token', token, { expires:expireDate});
  Cookies.set('token', token, { expires:expires});
};
