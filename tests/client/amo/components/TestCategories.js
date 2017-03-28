import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { Provider } from 'react-redux';

import createStore from 'amo/store';
import Categories, { mapStateToProps } from 'amo/components/Categories';
import { ADDON_TYPE_THEME } from 'core/constants';
import { getFakeI18nInst } from 'tests/client/helpers';


const categories = {
  Games: {
    application: 'android',
    name: 'Games',
    slug: 'Games',
    type: 'extension',
  },
  travel: {
    application: 'android',
    name: 'Travel',
    slug: 'travel',
    type: 'extension',
  },
};

describe('Categories', () => {
  function render({ ...props }) {
    const baseProps = {
      clientApp: 'android',
      categories,
    };
    const initialState = {
      api: { clientApp: 'android', lang: 'fr' },
      categories,
    };

    return findDOMNode(findRenderedComponentWithType(renderIntoDocument(
      <Provider store={createStore(initialState)}>
        <Categories i18n={getFakeI18nInst()} {...baseProps} {...props} />
      </Provider>
    ), Categories));
  }

  // it('renders Categories', () => {
  //   const root = render({
  //     addonType: 'extension',
  //     error: false,
  //     loading: false,
  //   });
  //
  //   assert.equal(root.querySelector('.Categories-list').textContent,
  //     'GamesTravel');
  // });
  //
  // it('renders loading when loading', () => {
  //   const root = render({
  //     addonType: 'extension',
  //     categories: [],
  //     error: false,
  //     loading: true,
  //   });
  //
  //   assert.include(root.textContent, 'Loading');
  // });
  //
  // it('renders a message when there are no categories', () => {
  //   const root = render({
  //     addonType: 'extension',
  //     categories: [],
  //     error: false,
  //     loading: false,
  //   });
  //
  //   assert.equal(root.textContent, 'No categories found.');
  // });
  //
  // it('renders an error', () => {
  //   const root = render({
  //     addonType: 'extension',
  //     categories: [],
  //     error: true,
  //     loading: false,
  //   });
  //
  //   assert.equal(root.textContent, 'Failed to load categories.');
  // });
});

describe('mapStateToProps', () => {
  it('maps state to props', () => {
    const props = mapStateToProps({
      api: { clientApp: 'android', lang: 'pt' },
      categories: {
        categories: {
          android: {
            [ADDON_TYPE_THEME]: {
              nature: {
                name: 'Nature',
                slug: 'nature',
              },
            },
          },
          firefox: {},
        },
        error: false,
        loading: true,
      },
    }, {
      params: { visibleAddonType: 'themes' },
    });

    assert.deepEqual(props, {
      addonType: ADDON_TYPE_THEME,
      categories: {
        nature: {
          name: 'Nature',
          slug: 'nature',
        },
      },
      clientApp: 'android',
      error: false,
      loading: true,
    });
  });
});
