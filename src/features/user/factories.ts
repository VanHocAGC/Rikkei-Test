import { RegisterFormType } from 'components/pageComponents/login';
import { axiosRequest } from 'utils/axiosRequest';

const factories = {
  login: (data: RegisterFormType) => {
    return axiosRequest({
      method: 'post',
      url: '/auth/login',
      data: data,
    });
  },
  getUserInfo: () => {
    return axiosRequest({
      method: 'get',
      url: '/auth/me',
    });
  },
};
export default factories;
