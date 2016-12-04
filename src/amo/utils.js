import { LANDING_PAGE_ADDON_COUNT } from 'amo/constants';
import { getLanding, loadLanding, failLanding } from 'amo/actions/landing';
import { featured, search } from 'core/api';


export function fetchLandingAddons({ addonType, api, dispatch }) {
  dispatch(getLanding({ addonType }));

  const landingRequests = [
    featured({
      api,
      filters: { addonType, page_size: LANDING_PAGE_ADDON_COUNT },
    }),
    search({
      api,
      filters: {
        addonType,
        page_size: LANDING_PAGE_ADDON_COUNT,
        sort: 'rating',
      },
      page: 1,
    }),
    search({
      api,
      filters: {
        addonType,
        page_size: LANDING_PAGE_ADDON_COUNT,
        sort: 'hotness',
      },
      page: 1,
    }),
  ];

  return Promise.all(landingRequests)
    .then((response) => dispatch(loadLanding({
      addonType,
      featured: response[0],
      highlyRated: response[1],
      popular: response[2],
    })))
    .catch(() => dispatch(failLanding({ addonType })));
}

export function loadLandingAddons({ store: { dispatch, getState }, params }) {
  const state = getState();
  const addonType = params.addonType.replace(/s$/, '');

  if (!(addonType === state.addonType && !state.loading)) {
    return fetchLandingAddons({ addonType, api: state.api, dispatch });
  }

  return true;
}
