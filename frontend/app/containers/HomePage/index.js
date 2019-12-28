/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import NavBar from 'components/NavBar/index';
import HierarchyViewer from 'containers/HierarchyViewer';
import { Paper } from '@material-ui/core';

import SearchResult from 'containers/SearchResult/index';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.scss';

export function HomePage({ dispatch, state }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  return (
    <div>
      <NavBar dispatch={dispatch} searchQuery={state.searchQuery} />

      {/* Search result */}
      <Paper elevation={1} className={styles.paper}>
        <SearchResult />
      </Paper>

      <Paper elevation={1} className={styles.paper}>
        <HierarchyViewer />
      </Paper>
    </div>
  );
}

HomePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  state: makeSelectHomePage(),
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
)(HomePage);
