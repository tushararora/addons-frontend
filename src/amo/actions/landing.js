import {
  LANDING_GET,
  LANDING_LOADED,
  LANDING_FAILED,
} from 'core/constants';


export function getLanding({ addonType }) {
  return {
    type: LANDING_GET,
    payload: { addonType },
  };
}

export function loadLanding(
  { addonType, entities, featured, highlyRated, popular }
) {
  return {
    type: LANDING_LOADED,
    payload: { addonType, entities, featured, highlyRated, popular },
  };
}

export function failLanding({ addonType }) {
  return {
    type: LANDING_FAILED,
    payload: { addonType },
  };
}
