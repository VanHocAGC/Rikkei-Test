import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  IProduct,
  IResponseCategory,
  IResponseProductWithPage,
  IResponseProducts,
  productState,
} from './interface';
import { LIMIT } from 'constants/index';

const initialState: productState = {
  isLoading: true,
  error: '',
  productList: [],
  total: 0,
  categoryList: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductList: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    getProductListSuccess: (
      state,
      action: PayloadAction<IResponseProducts>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.productList = action.payload.products;
      state.total = action.payload.summary.count;
    },
    getProductListFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearProduct: (state, action: PayloadAction) => {
      state.productList = [];
      state.total = 0;
    },
    getProductListByCategory: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    getProductListByCategorySuccess: (
      state,
      action: PayloadAction<IResponseProductWithPage>
    ) => {
      state.isLoading = false;
      state.error = '';
      let listProduct: Array<IProduct> = [];
      action.payload.response.map((item) => {
        listProduct = listProduct.concat(item.products);
        state.total += item.summary.count;
        return item;
      });
      state.productList = listProduct.filter(
        (item, index) => index >=(action.payload.page-1)*LIMIT && index <action.payload.page*LIMIT
      );
    },
    getProductListByCategoryFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCategoryList: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    getCategoryListSuccess: (
      state,
      action: PayloadAction<IResponseCategory>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.categoryList = action.payload.categories;
    },
    getCategoryListFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProductList,
  getProductListSuccess,
  getProductListFailure,
  clearProduct,
  getProductListByCategory,
  getProductListByCategorySuccess,
  getProductListByCategoryFailure,
  getCategoryList,
  getCategoryListSuccess,
  getCategoryListFailure,
} = productSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsLoading = (state: RootState) => state.product.isLoading;
export const selectError = (state: RootState) => state.product.error;
export const selectProductList = (state: RootState) =>
  state.product.productList;

export default productSlice.reducer;
