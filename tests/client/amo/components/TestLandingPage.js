import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { Provider } from 'react-redux';

import * as landingActions from 'amo/actions/landing';
import { LandingPageBase, mapStateToProps } from 'amo/components/LandingPage';
import createStore from 'amo/store';
import { ADDON_TYPE_EXTENSION, ADDON_TYPE_THEME } from 'core/constants';
import I18nProvider from 'core/i18n/Provider';
import { fakeAddon } from 'tests/client/amo/helpers';
import { getFakeI18nInst } from 'tests/client/helpers';


describe('<LandingPage />', () => {
  const initialState = { api: { clientApp: 'android', lang: 'en-GB' } };

  function render({ ...props }) {
    return findDOMNode(findRenderedComponentWithType(renderIntoDocument(
      <Provider store={createStore(initialState)}>
        <I18nProvider i18n={getFakeI18nInst()}>
          <LandingPageBase i18n={getFakeI18nInst()} {...props} />
        </I18nProvider>
      </Provider>
    ), LandingPageBase));
  }

  it('renders a LandingPage with no addons set', () => {
    const root = render({
      addonType: ADDON_TYPE_EXTENSION,
    });

    assert.include(root.textContent, 'Featured extensions');
    assert.include(root.textContent, 'More featured extensions');
  });

  it('renders a LandingPage with themes HTML', () => {
    const root = render({
      addonType: ADDON_TYPE_THEME,
    });

    assert.include(root.textContent, 'Featured themes');
    assert.include(root.textContent, 'More featured themes');
  });

  it('renders each add-on when set', () => {
    const store = createStore(initialState);
    store.dispatch(landingActions.loadLanding({
      featured: {
        entities: {
          addons: {
            howdy: {
              ...fakeAddon, name: 'Howdy', slug: 'howdy',
            },
            'howdy-again': {
              ...fakeAddon, name: 'Howdy again', slug: 'howdy-again',
            },
          },
        },
        result: { count: 50, results: ['howdy', 'howdy-again'] },
      },
      highlyRated: {
        entities: {
          addons: {
            high: {
              ...fakeAddon, name: 'High', slug: 'high',
            },
            'high-again': {
              ...fakeAddon, name: 'High again', slug: 'high-again',
            },
          },
        },
        result: { count: 50, results: ['high', 'high-again'] },
      },
      popular: {
        entities: {
          addons: {
            pop: {
              ...fakeAddon, name: 'Pop', slug: 'pop',
            },
            'pop-again': {
              ...fakeAddon, name: 'Pop again', slug: 'pop-again',
            },
          },
        },
        result: { count: 50, results: ['pop', 'pop-again'] },
      },
    }));
    const root = render({
      ...mapStateToProps(
        store.getState(), { params: { visibleAddonType: 'themes' } }),
    });

    assert.deepEqual(
      Object.values(root.querySelectorAll('.SearchResult-heading'))
        .map((heading) => heading.textContent),
      ['Howdy', 'Howdy again', 'High', 'High again', 'Pop', 'Pop again']
    );
  });

  it('renders not found if add-on type is not supported', () => {
    const root = render({ addonType: 'XUL' });
    assert.include(root.textContent, 'Page not found');
  });

  it('renders not found if add-on type is not supported', () => {
    assert.throws(() => {
      // Stubbing in a fake i18n here will cause contentForType to throw.
      // This is easier/lazier than doing dependency injection for that method.
      render({ addonType: 'doesntmatter', i18n: null });
    });
  });

  it('throws an error if a different error is encountered ', () => {
    const fakeError = new Error('Ice Cream Error');
    const fakeApiAddonType = () => { throw fakeError; };
    const store = createStore(initialState);

    assert.throws(() => {
      mapStateToProps(
        store.getState(),
        { params: { visibleAddonType: 'themes' } },
        fakeApiAddonType,
      );
    }, 'Ice Cream Error');
  });
});
