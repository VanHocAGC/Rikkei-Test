import { RegisterFormType } from 'components/pageComponents/login';
import { IPaginationRequest, NavigateFunction } from 'interfaces';

export interface UserState {
  isLoading: boolean;
  loading:boolean;
  error: string;
  userInfo: IUserInfo;
}
export interface IUserInfo {
  id?: number;
  username: string;
  created: string;
  password: string;
  status:string;
}
export interface IUserLogin extends NavigateFunction{
  value:RegisterFormType
}