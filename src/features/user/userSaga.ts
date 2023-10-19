import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { TOKEN } from 'constants/index';
import { ITokenInfo } from 'interfaces';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { CheckExpiredJWT, HandleToken } from 'utils';
import factories from './factories';
import { IUserLogin } from './interface';
import {
  getUserInfo,
  getUserInfoFailure,
  getUserInfoSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutSuccess,
  resetValue,
} from './userSlide';
import { toast } from 'react-toastify';

function* handleGetUserInfo() {
  yield takeLatest(getUserInfo.type, function* (payload: PayloadAction) {
    try {
      const token = Cookies.get(TOKEN);
      if (token) {
        if (!CheckExpiredJWT(token).isExpired) {
          const response: any = yield call(() => factories.getUserInfo());
          yield put({
            type: getUserInfoSuccess.type,
            payload: response,
          });
        } else {
          toast.error("Token has expired")
          yield put({
            type: resetValue.type,
          });
        }
      }
    } catch (error) {
      const err = error as AxiosError<{
        message: string;
        statusCode: number;
      }>;
      Cookies.remove(TOKEN);
      switch (err.response?.data.statusCode) {
        case 400:
          toast.error(err.response?.data.message);
          break;
        case 401:
          toast.error('Invalid token');
          break;
        default:
          yield put({
            type: loginFailure.type,
            payload: 'Wrong username or password',
          });
          break;
      }
      yield put({
        type: getUserInfoFailure.type,
        payload: -1,
      });
    }
  });
}
function* handleLogin() {
  yield takeLatest(login.type, function* (payload: PayloadAction<IUserLogin>) {
    try {
      const response: any = yield call(() =>
        factories.login(payload.payload.value)
      );
      const tokenInfo: ITokenInfo = jwtDecode(response.access_token);
      HandleToken(response.access_token, tokenInfo.exp);
      yield put({
        type: loginSuccess.type,
        payload: tokenInfo.username,
      });
      payload.payload.navigate('/');
    } catch (error) {
      const err = error as AxiosError<{
        message: string;
        statusCode: number;
      }>;
      switch (err.response?.data.statusCode) {
        case 400:
          yield put({
            type: loginFailure.type,
            payload: err.response?.data.message,
          });
          break;
        case 401:
          yield put({
            type: loginFailure.type,
            payload: err.response?.data.message,
          });
          break;
        default:
          yield put({
            type: loginFailure.type,
            payload: 'Wrong username or password',
          });
          break;
      }
    }
  });
}
function* handleLogout() {
  yield takeLatest(logout.type, function* (payload: PayloadAction) {
    Cookies.remove(TOKEN);
    toast.success('Logout Success');
    yield put({
      type: logoutSuccess.type,
    });
  });
}
export default function* rootSaga() {
  yield all([fork(handleGetUserInfo), fork(handleLogin), fork(handleLogout)]);
}
