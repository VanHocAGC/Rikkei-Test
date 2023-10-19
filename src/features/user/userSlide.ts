import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { TOKEN } from 'constants/index';
import Cookies from 'js-cookie';
import { IUserInfo, UserState } from './interface';

const initialState: UserState = {
  isLoading: true,
  loading: false,
  error: '',
  userInfo: {
    id: undefined,
    username: '',
    created: '',
    password: '',
    status: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = '';
      state.userInfo.id = 1;
      state.userInfo.username = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUserInfo: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    getUserInfoSuccess: (state, action: PayloadAction<IUserInfo>) => {
      state.isLoading = false;
      state.error = '';
      state.userInfo = action.payload;
    },
    getUserInfoFailure: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.userInfo.id = action.payload;
    },
    logout: (state, action: PayloadAction) => {
      state.loading = true;
    },
    logoutSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = '';
      state.userInfo = {
        id: -1,
        username: '',
        created: '',
        password: '',
        status: '',
      };
    },
    resetValue: (state, action: PayloadAction) => {
      Cookies.remove(TOKEN);
      state.error = '';
      state.userInfo = {
        id: -1,
        username: '',
        created: '',
        password: '',
        status: '',
      };
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFailure,
  logout,
  logoutSuccess,
  resetValue,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectError = (state: RootState) => state.user.error;
export const selectUserInfo = (state: RootState) => state.user.userInfo;

export default userSlice.reducer;
