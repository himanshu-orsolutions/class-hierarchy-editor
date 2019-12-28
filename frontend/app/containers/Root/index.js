/**
 *
 * Root
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import HomePage from 'containers/HomePage';
import axios from 'axios';
import { SERVER_BASE_URL } from 'global-constants';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRoot from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Root(/* dispatch */) {
  useInjectReducer({ key: 'root', reducer });
  useInjectSaga({ key: 'root', saga });

  axios.defaults.baseURL = SERVER_BASE_URL;

  return (
    <div>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
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
