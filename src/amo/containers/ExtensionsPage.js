import { compose } from 'redux';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';

import LandingPage from 'amo/components/LandingPage';
import { loadLandingAddons } from 'amo/utils';


export function setAddonType(state, ownProps) {
  return { addonType: ownProps.params.addonType.replace(/s$/, '') };
}

export function mapStateToProps(state) {
  return {
    featuredAddons: state.landing.featured.results,
    highlyRatedAddons: state.landing.highlyRated.results,
    popularAddons: state.landing.popular.results,
  };
}

export default compose(
  asyncConnect([
    { deferred: true, promise: loadLandingAddons },
  ]),
  connect(mapStateToProps),
  connect(setAddonType),
)(LandingPage);
