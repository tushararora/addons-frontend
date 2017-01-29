import {
  REDUX_CONNECT_END_GLOBAL_LOAD,
  REDUX_CONNECT_LOAD_FAIL,
} from 'core/constants';
import errorPage, { initialState } from 'core/reducers/errorPage';


describe('errorPage reducer', () => {
  it('defaults to no error and nothing to clear', () => {
    const state = errorPage(initialState, { type: 'unrelated' });
    assert.deepEqual(state, initialState);
  });

  describe('REDUX_CONNECT_END_GLOBAL_LOAD', () => {
    it('sets clearOnNext then clears it next time', () => {
      let state = errorPage(initialState, { type: 'unrelated' });
      assert.equal(state.clearOnNext, false);

      state = errorPage(state, { type: REDUX_CONNECT_END_GLOBAL_LOAD });
      assert.equal(state.clearOnNext, true);

      state = errorPage(state, { type: REDUX_CONNECT_END_GLOBAL_LOAD });
      assert.deepEqual(state.statusCode, initialState.statusCode);
    });
  });

  describe('REDUX_CONNECT_LOAD_FAIL', () => {
    it('sets clearOnNext then clears it next time', () => {
      let state = errorPage(initialState, { type: 'unrelated' });
      assert.equal(state.error, null);

      const payload = {
        error: {
          response: {
            otherData: 'something',
            status: 404,
          },
        },
      };
      state = errorPage(state, { type: REDUX_CONNECT_LOAD_FAIL, payload });
      assert.equal(state.hasError, true);
      assert.equal(state.statusCode, payload.error.response.status);
      assert.deepEqual(state.error, payload.error);
    });
  });
});
