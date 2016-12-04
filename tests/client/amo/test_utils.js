import createStore from 'amo/store';
import * as landingActions from 'amo/actions/landing';
import * as api from 'core/api';
import { loadLandingAddons } from 'amo/utils';


describe('AMO utils loadLandingAddons()', () => {
  const addonType = 'theme';
  let ownProps;

  before(() => {
    ownProps = {
      params: {
        addonType: 'themes',
        application: 'android',
      },
    };
  });

  it('returns right away when loaded', () => {
    const store = createStore({ application: 'android' });
    store.dispatch(landingActions.getLanding({ addonType }));
    const mockApi = sinon.mock(api);
    const entities = sinon.stub();
    const result = sinon.stub();

    mockApi
      .expects('featured')
      .once()
      .withArgs({ api: {}, filters: { addonType, page_size: 4 } })
      .returns(Promise.resolve({ entities, result }));
    mockApi
      .expects('search')
      .once()
      .withArgs({
        api: {},
        filters: { addonType, sort: 'rating', page_size: 4 },
        page: 1,
      })
      .returns(Promise.resolve({ entities, result }));
    mockApi
      .expects('search')
      .once()
      .withArgs({
        api: {},
        filters: { addonType, sort: 'hotness', page_size: 4 },
        page: 1,
      })
      .returns(Promise.resolve({ entities, result }));

    return loadLandingAddons({ store, params: ownProps.params })
      .then(() => {
        mockApi.verify();
        assert.strictEqual(loadLandingAddons({
          store: {
            dispatch: sinon.stub(),
            getState: () => ({
              addonType: 'theme',
              featured: { count: 0, results: {} },
              highlyRated: { count: 0, results: {} },
              loading: false,
              popular: { count: 0, results: {} },
            }),
          },
          params: ownProps.params,
        }), true);
      });
  });
});

// describe('AMO utils loadHighlyRated()', () => {
//   const addonType = 'theme';
//   let ownProps;
//
//   before(() => {
//     ownProps = {
//       params: {
//         addonType: 'themes',
//         application: 'android',
//       },
//     };
//   });
//
//   it('returns right away when loaded', () => {
//     const store = createStore({ application: 'android' });
//     store.dispatch(
//       highlyRatedActions.highlyRatedStart({ filters: { addonType } }));
//     const mockApi = sinon.mock(api);
//     const entities = sinon.stub();
//     const result = sinon.stub();
//
//     mockApi
//       .expects('search')
//       .once()
//       .withArgs({
//         api: {},
//         filters: { addonType: 'theme', page_size: 4, sort: 'rating' },
//         page: 1,
//       })
//       .returns(Promise.resolve({ entities, result }));
//     return loadHighlyRated({
//       store,
//       location: ownProps.location,
//       params: ownProps.params,
//     }).then(() => {
//       mockApi.verify();
//       assert.strictEqual(loadHighlyRated({
//         store: {
//           dispatch: sinon.stub(),
//           getState: () => ({
//             filters: { addonType: 'theme', page_size: 4, sort: 'rating' },
//             loading: false,
//           }),
//         },
//         location: ownProps.location,
//         params: ownProps.params,
//       }), true);
//     });
//   });
// });
//
// describe('AMO utils loadPopular()', () => {
//   const addonType = 'extension';
//   let ownProps;
//
//   before(() => {
//     ownProps = {
//       params: {
//         addonType: 'extensions',
//         application: 'android',
//       },
//     };
//   });
//
//   it('returns right away when loaded', () => {
//     const store = createStore({ application: 'android' });
//     store.dispatch(popularActions.popularStart({ filters: { addonType } }));
//     const mockApi = sinon.mock(api);
//     const entities = sinon.stub();
//     const result = sinon.stub();
//
//     mockApi
//       .expects('search')
//       .once()
//       .withArgs({
//         api: {},
//         filters: { addonType: 'extension', page_size: 4, sort: 'hotness' },
//         page: 1,
//       })
//       .returns(Promise.resolve({ entities, result }));
//     return loadPopular({
//       store,
//       location: ownProps.location,
//       params: ownProps.params,
//     }).then(() => {
//       mockApi.verify();
//       assert.strictEqual(loadPopular({
//         store: {
//           dispatch: sinon.stub(),
//           getState: () => ({
//             filters: { addonType: 'extension', page_size: 4, sort: 'hotness' },
//             loading: false,
//           }),
//         },
//         location: ownProps.location,
//         params: ownProps.params,
//       }), true);
//     });
//   });
// });
