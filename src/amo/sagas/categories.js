import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  categoriesFail,
  categoriesFetch,
  categoriesLoad,
} from 'core/actions/categories';
import { categories as categoriesApi } from 'core/api';

import { getApi } from './utils';


// worker Saga: will be fired on every CATEGORIES_FETCH action.
export function* fetchCategories() {
  try {
    const api = yield select(getApi);
    const response = yield call(categoriesApi, { api });
    yield put(categoriesLoad(response));
  } catch (err) {
    yield put(categoriesFail(err));
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
