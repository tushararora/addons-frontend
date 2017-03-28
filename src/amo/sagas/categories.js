import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  categoriesFetch,
  categoriesLoad,
} from 'core/actions/categories';
import { categories as categoriesApi } from 'core/api';
import {
  CATEGORIES_FAIL,
} from 'core/constants';


export const getApi = (state) => state.api;

// worker Saga: will be fired on every CATEGORIES_FETCH action.
export function* fetchCategories() {
  try {
    const api = yield select(getApi);
    const response = yield call(categoriesApi, { api });
    yield put(categoriesLoad(response));
  } catch (e) {
    yield put({ type: CATEGORIES_FAIL, message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `categoriesFetch` action.
  Allows concurrent fetches of categoriesFetch.
*/
export function* categoriesSaga() {
  yield takeEvery(categoriesFetch().type, fetchCategories);
}

export default categoriesSaga;
