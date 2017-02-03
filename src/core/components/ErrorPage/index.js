import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getErrorComponent as getErrorComponentCore } from 'core/utils';


export class ErrorPageBase extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    errorPage: PropTypes.object.isRequired,
    getErrorComponent: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errorPage: {},
    getErrorComponent: getErrorComponentCore,
  }

  render() {
    const { children, errorPage, getErrorComponent } = this.props;

    if (errorPage.hasError) {
      const ErrorComponent = getErrorComponent(errorPage.statusCode);
      return (
        <ErrorComponent error={errorPage.error} status={errorPage.statusCode} />
      );
    }

    return children;
  }
}


export const mapStateToProps = (state) => ({
  errorPage: state.errorPage,
});

export default compose(
  connect(mapStateToProps),
)(ErrorPageBase);
