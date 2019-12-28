/**
 *
 * SearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { startLoadingTreeData } from 'containers/HierarchyViewer/actions';
import makeSelectSearchResult from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.scss';
import { resetSearch } from './actions';

export function SearchResult({ state, dispatch }) {
  useInjectReducer({ key: 'searchResult', reducer });
  useInjectSaga({ key: 'searchResult', saga });

  const rows = state.data;

  return (
    <>
      {state.isShowSearchResult && (
        <div className={styles.root}>
          <Typography variant="h6">Search Result</Typography>

          {state && !state.isLoading && (
            <Button
              className={styles.resetBtn}
              color="primary"
              variant="contained"
              size="small"
              onClick={() => {
                dispatch(resetSearch());
                dispatch(startLoadingTreeData(0));
              }}
            >
              Reset search
            </Button>
          )}

          {state && !state.isLoading ? (
            <TableContainer>
              <Table
                className={styles.table}
                size="small"
                aria-label="simple table dense"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>CID</TableCell>
                    <TableCell align="right">Class Name</TableCell>
                    <TableCell align="right">PID</TableCell>
                    <TableCell align="right">Abstract</TableCell>
                    <TableCell align="right" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.cid}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.pid}</TableCell>
                      <TableCell align="right">{`${row.abstract}`}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={() =>
                            dispatch(startLoadingTreeData(row.cid))
                          }
                        >
                          View hierarchy
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <CircularProgress />
          )}
        </div>
      )}
    </>
  );
}

SearchResult.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectSearchResult(),
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

export default compose(withConnect)(SearchResult);
