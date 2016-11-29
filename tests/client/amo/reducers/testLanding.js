import landing from 'amo/reducers/landing';

describe('landing reducer', () => {
  it('defaults to not loading', () => {
    const { loading } = landing(undefined, { type: 'unrelated' });

    assert.strictEqual(loading, false);
  });

  it('defaults to zero count', () => {
    const { featured, highlyRated, popular } = landing(undefined, {
      type: 'unrelated',
    });

    assert.strictEqual(featured.count, 0);
    assert.strictEqual(highlyRated.count, 0);
    assert.strictEqual(popular.count, 0);
  });

  it('defaults to empty results', () => {
    const { featured, highlyRated, popular } = landing(undefined, {
      type: 'unrelated',
    });
    assert.deepEqual(featured.results, []);
    assert.deepEqual(highlyRated.results, []);
    assert.deepEqual(popular.results, []);
  });

  describe('LANDING_GET', () => {
    it('sets the initialState', () => {
      const initialState = {
        featured: { foo: 'bar' },
        highlyRated: { count: 0 },
        loading: false,
        popular: { results: [] },
      };
      const {
        addonType, featured, highlyRated, loading, popular,
      } = landing(initialState, {
        type: 'LANDING_GET',
        payload: { addonType: 'theme' },
      });

      assert.equal(addonType, 'theme');
      assert.equal(loading, true);
      assert.deepEqual(featured, { foo: 'bar' });
      assert.deepEqual(highlyRated, { count: 0 });
      assert.deepEqual(popular, { results: [] });
    });
  });

  describe('LANDING_LOADED', () => {
    it('sets the results', () => {
      const { featured, highlyRated, popular } = landing(undefined, {
        type: 'LANDING_LOADED',
        payload: {
          addonType: 'theme',
          featured: { result: { count: 2, results: ['foo', 'food'] } },
          highlyRated: { result: { count: 0, results: [] } },
          popular: { result: { count: 0, results: [] } },
          entities: {
            addons: {
              bar: { slug: 'bar' },
              foo: { slug: 'foo' },
              food: { slug: 'food' },
            },
          },
        },
      });
      assert.equal(featured.count, 2);
      assert.deepEqual(featured.results, [{ slug: 'foo' }, { slug: 'food' }]);
      assert.deepEqual(highlyRated, { count: 0, results: [] });
      assert.deepEqual(popular, { count: 0, results: [] });
    });
  });

  describe('LANDING_FAILED', () => {
    it('overrides the initialState with page and filters', () => {
      const initialState = { addonType: 'theme', foo: 'bar', results: [3] };
      const state = landing(initialState,
        { type: 'LANDING_FAILED', payload: { page: 2, addonType: 'theme' } });
      assert.deepEqual(state, {
        featured: { count: 0, results: [] },
        highlyRated: { count: 0, results: [] },
        loading: false,
        popular: { count: 0, results: [] },
      });
    });
  });
});
