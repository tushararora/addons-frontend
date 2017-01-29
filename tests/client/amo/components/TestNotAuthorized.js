import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { Provider } from 'react-redux';

import NotAuthorized from 'amo/components/NotAuthorized';
import createStore from 'amo/store';
import { REDUX_CONNECT_LOAD_FAIL } from 'core/constants';
import I18nProvider from 'core/i18n/Provider';
import { signedInApiState } from 'tests/client/amo/helpers';
import { getFakeI18nInst } from 'tests/client/helpers';


describe('<NotAuthorized />', () => {
  function render({ ...props }) {
    const store = createStore(signedInApiState);
    const payload = {
      error: {
        response: {
          otherData: 'something',
          status: 401,
        },
      },
    };
    store.dispatch({ type: REDUX_CONNECT_LOAD_FAIL, payload });

    return findDOMNode(findRenderedComponentWithType(renderIntoDocument(
      <Provider store={store}>
        <I18nProvider i18n={getFakeI18nInst()}>
          <NotAuthorized {...props} />
        </I18nProvider>
      </Provider>
    ), NotAuthorized));
  }

  it('renders a not authorized error', () => {
    const rootNode = render();

    assert.include(rootNode.textContent, 'Not Authorized');
  });
});
