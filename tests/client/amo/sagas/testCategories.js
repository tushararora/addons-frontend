import { call, put, select } from 'redux-saga/effects';

import { fetchCategories, getApi } from 'amo/sagas/categories';
import * as actions from 'core/actions/categories';
import { categories as categoriesApi } from 'core/api';


const categories = {};

describe('categoriesSaga', () => {
  it('should get Api from state then make API request to categories', () => {
    const fetchCategoriesGenerator = fetchCategories();

    let next = fetchCategoriesGenerator.next();
    const api = next.value;
    assert.deepEqual(api, select(getApi), 'must yield getApi');

    next = fetchCategoriesGenerator.next();
    assert.deepEqual(next.value, call(categoriesApi, { api: undefined }),
      'must yield categoriesApi');

    next = fetchCategoriesGenerator.next(categories);
    assert.deepEqual(next.value, put(actions.categoriesLoad(categories)),
      'must yield categoriesLoad(categories)');
  });

  it('should dispatch fail if API request fails', () => {
    const fetchCategoriesGenerator = fetchCategories();

    let next = fetchCategoriesGenerator.next();
    const api = next.value;
    assert.deepEqual(api, select(getApi), 'must yield getApi');

    next = fetchCategoriesGenerator.next();
    assert.deepEqual(next.value, call(categoriesApi, { api: undefined }),
      'must yield categoriesApi');

    // No response is defined so this will fail.
    // TODO: Make this a bit more explicit; failing on a TypeError rather
    // than an API error is pretty weak.
    const error = new TypeError('response is undefined');
    next = fetchCategoriesGenerator.next();
    assert.deepEqual(next.value,
      put(actions.categoriesFail(error)),
      'must yield categoriesFail(error)');
  });
});
