/* eslint-disable no-nested-ternary */
/**
 *
 * HierarchyViewer
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SvgIcon from '@material-ui/core/SvgIcon';
import TreeView from '@material-ui/lab/TreeView';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import CustomTreeItem from './CustomTreeItem/index';
import makeSelectHierarchyViewer from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.scss';
import { startLoadingTreeData } from './actions';

export function HierarchyViewer({ state, dispatch }) {
  useInjectReducer({ key: 'hierarchyViewer', reducer });
  useInjectSaga({ key: 'hierarchyViewer', saga });

  useEffect(() => {
    dispatch(startLoadingTreeData(0));
  }, []);

  const getTree = data => {
    if (data) {
      return data.map(treeNode => (
        <CustomTreeItem
          nodeId={treeNode.cid}
          label={`${treeNode.name} (cid: ${treeNode.cid})`}
          key={treeNode.cid}
          pid={treeNode.pid}
          abstract={treeNode.abstract}
        >
          {getTree(treeNode.superclassOf)}
        </CustomTreeItem>
      ));
    }
    return undefined;
  };

  return (
    <div className={styles.root}>
      <div>
        <Typography variant="h6">
          {state.treeData
            ? state.treeData.name != 'Root'
              ? state.treeData.name
              : 'All'
            : ''}{' '}
          Class hierarchy
        </Typography>
        {state && !state.isLoading ? (
          state.treeData.superclassOf ? (
            <>
              <TreeView
                defaultExpanded={['1']}
                defaultCollapseIcon={<MinusSquare />}
                defaultExpandIcon={<PlusSquare />}
                defaultEndIcon={<CloseSquare />}
              >
                {getTree(state.treeData.superclassOf)}
              </TreeView>
            </>
          ) : (
            'No data available'
          )
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
}

HierarchyViewer.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectHierarchyViewer(),
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

export default compose(withConnect)(HierarchyViewer);

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}
