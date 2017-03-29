import { getApi } from 'amo/sagas/utils';
import { signedInApiState } from 'tests/client/amo/helpers';


describe('Saga utils', () => {
  it('should return API state', () => {
    const state = { api: signedInApiState, somethingElse: true };

    assert.deepEqual(getApi(state), signedInApiState);
  });
});
