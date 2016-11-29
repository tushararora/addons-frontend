import * as actions from 'amo/actions/landing';


describe('LANDING_GET', () => {
  const action = actions.getLanding({ addonType: 'theme' });

  it('sets the type', () => {
    assert.equal(action.type, 'LANDING_GET');
  });

  it('sets the filters', () => {
    assert.deepEqual(action.payload, { addonType: 'theme' });
  });
});

describe('LANDING_LOADED', () => {
  const entities = sinon.stub();
  const response = {
    featured: sinon.stub(),
    highlyRated: sinon.stub(),
    popular: sinon.stub(),
  };
  const action = actions.loadLanding({
    addonType: 'theme', entities, ...response });

  it('sets the type', () => {
    assert.equal(action.type, 'LANDING_LOADED');
  });

  it('sets the payload', () => {
    assert.deepEqual(action.payload, {
      addonType: 'theme', entities, ...response });
  });
});

describe('LANDING_FAILED', () => {
  const action = actions.failLanding({ addonType: 'extension' });

  it('sets the type', () => {
    assert.equal(action.type, 'LANDING_FAILED');
  });

  it('sets the payload', () => {
    assert.deepEqual(action.payload, { addonType: 'extension' });
  });
});
