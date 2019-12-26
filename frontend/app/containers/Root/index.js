/**
 *
 * Root
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import HomePage from 'containers/HomePage';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRoot from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Root(/* dispatch */) {
  useInjectReducer({ key: 'root', reducer });
  useInjectSaga({ key: 'root', saga });

  return (
    <div>
      <Helmet>
        <title>Root</title>
        <meta name="description" content="Description of Root" />
      </Helmet>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

Root.propTypes = {
  /* dispatch: PropTypes.func.isRequired, */
};

const mapStateToProps = createStructuredSelector({
  root: makeSelectRoot(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Root);
