/**
 *
 * NotFoundPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNotFoundPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function NotFoundPage() {
  useInjectReducer({ key: 'notFoundPage', reducer });
  useInjectSaga({ key: 'notFoundPage', saga });

  return (
    <div>
      <Helmet>
        <title>NotFoundPage</title>
        <meta name="description" content="Description of NotFoundPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

NotFoundPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notFoundPage: makeSelectNotFoundPage(),
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
)(NotFoundPage);
