import { all } from "redux-saga/effects";
import productSaga from "features/product/productSaga"
import userSaga from "features/user/userSaga"
export default function* rootSaga() {
  yield all([
    productSaga(),
    userSaga(),
  ]);
}
