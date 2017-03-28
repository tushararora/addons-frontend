import { call, fork, put, select } from 'redux-saga/effects';

import categoriesSaga, { fetchCategories, getApi } from 'amo/sagas/categories';
import * as actions from 'core/actions/categories';
import { categories as categoriesApi } from 'core/api';


const categories = {};
const state = { categories };
const getState = () => state;

describe('categoriesSaga', () => {
  it('', () => {
    // const generator = categoriesSaga(getState);
    const fetchCategoriesGenerator = fetchCategories();

    const response = { results: categories };

    let next = fetchCategoriesGenerator.next();
    const api = next.value;
    assert.deepEqual(api, select(getApi), 'must yield getApi');

    next = fetchCategoriesGenerator.next();
    assert.deepEqual(next.value, call(categoriesApi, { api: undefined }),
      'must yield categoriesApi');

    // actions.categoriesFetch(response)
    // next = fetchCategoriesGenerator.next(categories);
    // assert.deepEqual(next.value, put(actions.categoriesLoad(categories)),
    //   'must yield actions.receiveProducts(products)'
    // );
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
