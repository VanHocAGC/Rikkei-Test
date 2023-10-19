import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import factories from './factories';
import {
  clearProduct,
  getCategoryList,
  getCategoryListFailure,
  getCategoryListSuccess,
  getProductList,
  getProductListByCategory,
  getProductListByCategorySuccess,
  getProductListFailure,
  getProductListSuccess,
} from './productSlide';
import { IPagination, IProductFilter } from 'interfaces';
import { MAX_LIMIT } from 'constants/index';

function* handleGetProductList() {
  yield takeLatest(
    getProductList.type,
    function* (payload: PayloadAction<IPagination>) {
      try {
        const response: any = yield call(() =>
          factories.getProductList({
            skip: (payload.payload.page - 1) * payload.payload.limit,
            limit: payload.payload.limit,
          })
        );
        yield put({
          type: getProductListSuccess.type,
          payload: response,
        });
      } catch (error) {
        yield put({
          type: getProductListFailure.type,
          // error
        });
      }
    }
  );
}
function* handleGetProductListByCategories() {
  yield takeLatest(
    getProductListByCategory.type,
    function* (payload: PayloadAction<IProductFilter>) {
        yield put({
          type: clearProduct.type,
        });
        //There is no API to get products by multiple categories
        const request = payload.payload.listCategory?.map((item) => {
          return call(() =>
            factories.getProductListByCategory({
              skip: 0,
              limit: MAX_LIMIT,
              category: item,
            })
          );
        });
        try {
          const response: any = yield all(request);
          yield put({
            type: getProductListByCategorySuccess.type,
            payload: {response:response, page:payload.payload.page},
          });
        } catch (error) {
          yield put({
            type: getProductListFailure.type,
            // error
          });
        }
      
    }
  );
}
function* handleGetCategoryList() {
  yield takeLatest(
    getCategoryList.type,
    function* (payload: PayloadAction) {
        try {
          const response: any = yield call(() =>
            factories.getCategoryList()
          );
          yield put({
            type: getCategoryListSuccess.type,
            payload: response,
          });
        } catch (error) {
          yield put({
            type: getCategoryListFailure.type,
            // error
          });
        }
    }
  );
}

export default function* rootSaga() {
  yield all([
    fork(handleGetProductList),
    fork(handleGetProductListByCategories),
    fork(handleGetCategoryList),
  ]);
}
