import { call, fork, put, select } from 'redux-saga/effects';

import categoriesSaga, { fetchCategories, getApi } from 'amo/sagas/categories';
import * as actions from 'core/actions/categories';
import { categories as categoriesApi } from 'core/api';


const categories = {};
const state = { categories };
const getState = () => state;

describe('categoriesSaga', () => {
  it('should get Api from state then make API request to categories', () => {
    // const generator = categoriesSaga(getState);
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
    // const generator = categoriesSaga(getState);
    const fetchCategoriesGenerator = fetchCategories();

    let next = fetchCategoriesGenerator.next();
    const api = next.value;
    assert.deepEqual(api, select(getApi), 'must yield getApi');

    next = fetchCategoriesGenerator.next();
    assert.deepEqual(next.value, call(categoriesApi, { api: undefined }),
      'must yield categoriesApi');

    // No response is defined so this will fail.
    const error = new TypeError('response is undefined');
    next = fetchCategoriesGenerator.next();
    assert.deepEqual(next.value,
      put(actions.categoriesFail(error)),
      'must yield categoriesFail(error)');
  });
});

//
// test('checkout Saga test', function (t) {
//
//
//   const generator = checkout()
//
//   let next = generator.next()
//   t.deepEqual(next.value, select(getCart),
//     "must select getCart"
//   )
//
//   next = generator.next(cart)
//   t.deepEqual(next.value, call(api.buyProducts, cart),
//     "must call api.buyProducts(cart)"
//   )
//
//   next = generator.next()
//   t.deepEqual(next.value, put(actions.checkoutSuccess(cart)),
//     "must yield actions.checkoutSuccess(cart)"
//   )
//
//   t.end()
// })
