import {
  LANDING_GET,
  LANDING_LOADED,
  LANDING_FAILED,
} from 'core/constants';


export const initialState = {
  featured: { count: 0, results: [] },
  highlyRated: { count: 0, results: [] },
  loading: false,
  popular: { count: 0, results: [] },
};

export default function landing(state = initialState, action) {
  const { payload } = action;
  let newState;
  switch (action.type) {
    case LANDING_GET:
      return { ...state, ...payload, loading: true };
    case LANDING_LOADED:
      newState = { ...state, loading: false };
      ['featured', 'highlyRated', 'popular'].forEach((key) => {
        newState[key] = {
          count: payload[key].result.count,
          results: payload[key].result.results.map((slug) => payload.entities.addons[slug]),
        };
      });

      return newState;
    case LANDING_FAILED:
      return initialState;
    default:
      return state;
  }
}
