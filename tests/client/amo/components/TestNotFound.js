import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { Provider } from 'react-redux';

import NotFound from 'amo/components/NotFound';
import createStore from 'amo/store';
import { REDUX_CONNECT_LOAD_FAIL } from 'core/constants';
import I18nProvider from 'core/i18n/Provider';
import { signedInApiState } from 'tests/client/amo/helpers';
import { getFakeI18nInst } from 'tests/client/helpers';


describe('<NotFound />', () => {
  function render({ ...props }) {
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

    return findDOMNode(findRenderedComponentWithType(renderIntoDocument(
      <Provider store={store}>
        <I18nProvider i18n={getFakeI18nInst()}>
          <NotFound {...props} />
        </I18nProvider>
      </Provider>
    ), NotFound));
  }

  it('renders a not found error', () => {
    const rootNode = render();

    assert.include(rootNode.textContent, 'Page not found');
  });
});
