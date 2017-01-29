import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { Provider } from 'react-redux';

import ErrorPage, { mapStateToProps } from 'amo/components/ErrorPage';
import createStore from 'amo/store';
import { REDUX_CONNECT_LOAD_FAIL } from 'core/constants';
import { getFakeI18nInst } from 'tests/client/helpers';
import I18nProvider from 'core/i18n/Provider';
import { signedInApiState } from 'tests/client/amo/helpers';


describe('<ErrorPage />', () => {
  function render({ ...props }, store = createStore(signedInApiState)) {
    return findDOMNode(findRenderedComponentWithType(renderIntoDocument(
      <Provider store={store}>
        <I18nProvider i18n={getFakeI18nInst()}>
          <ErrorPage {...props} />
        </I18nProvider>
      </Provider>
    ), ErrorPage));
  }

  it('renders children when there are no errors', () => {
    const rootNode = render({ children: <div>hello</div> });

    assert.equal(rootNode.textContent, 'hello');
  });

  it('renders an error page on error', () => {
    const store = createStore(signedInApiState);
    const payload = {
      error: {
        response: {
          otherData: 'something',
          status: 404,
        },
      },
    };
    store.dispatch({ type: REDUX_CONNECT_LOAD_FAIL, payload });

    const rootNode = render({ children: <div>hello</div> }, store);

    assert.notEqual(rootNode.textContent, 'hello');
    assert.include(rootNode.textContent, 'Page not found');
  });
});

describe('<ErrorPage mapStateToProps />', () => {
  it('returns errorPage from state', () => {
    assert.deepEqual(
      mapStateToProps({ errorPage: 'howdy' }), { errorPage: 'howdy' });
  });
});
