import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Link from 'amo/components/Link';
import { categoriesFetch } from 'core/actions/categories';
import { apiAddonType, visibleAddonType } from 'core/utils';
import translate from 'core/i18n/translate';
import LoadingIndicator from 'ui/components/LoadingIndicator';

import './Categories.scss';


export class CategoriesBase extends React.Component {
  static propTypes = {
    addonType: PropTypes.string.isRequired,
    dispatch: PropTypes.func,
    categories: PropTypes.object.isRequired,
    clientApp: PropTypes.string.isRequired,
    error: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    i18n: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { addonType, categories, clientApp, dispatch } = this.props;
    if (!Object.values(categories).length) {
      dispatch(categoriesFetch({ addonType, clientApp }));
    }
  }

  render() {
    const { addonType, categories, error, loading, i18n } = this.props;

    if (loading) {
      return (
        <div className="Categories">
          <LoadingIndicator />
          <p>{i18n.gettext('Loading categories')}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="Categories">
          <p>{i18n.gettext('Failed to load categories.')}</p>
        </div>
      );
    }

    if (!Object.values(categories).length) {
      return (
        <div className="Categories">
          <p>{i18n.gettext('No categories found.')}</p>
        </div>
      );
    }

    return (
      <div className="Categories">
        <ul className="Categories-list"
          ref={(ref) => { this.categories = ref; }}>
          {Object.values(categories).map((category) => (
            <li className="Categories-list-item">
              <Link className="Categories-link"
                to={`/${visibleAddonType(addonType)}/${category.slug}/`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  const addonType = apiAddonType(ownProps.params.visibleAddonType);
  const clientApp = state.api.clientApp;
  const categories = state.categories.categories[clientApp][addonType] ?
    state.categories.categories[clientApp][addonType] : {};

  return {
    addonType,
    categories,
    clientApp,
    error: state.categories.error,
    loading: state.categories.loading,
  };
}

export default compose(
  connect(mapStateToProps),
  translate({ withRef: true }),
)(CategoriesBase);
