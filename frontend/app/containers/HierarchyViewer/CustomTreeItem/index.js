/**
 *
 * CustomTreeItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { fade, withStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import { Collapse, Typography, IconButton } from '@material-ui/core';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCustomTreeItem from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.scss';

export function CustomTreeItem(props) {
  useInjectReducer({ key: 'customTreeItem', reducer });
  useInjectSaga({ key: 'customTreeItem', saga });

  return <StyledTreeItem {...props} />;
}

CustomTreeItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  customTreeItem: makeSelectCustomTreeItem(),
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

export default compose(withConnect)(CustomTreeItem);

const StyledTreeItem = withStyles(theme => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))(props => (
  <TreeItem
    {...props}
    TransitionComponent={TransitionComponent}
    label={
      <div className={styles.root}>
        <Typography variant="body2">{props.label}</Typography>
        <div>
          <IconButton aria-label="delete">
            <DeleteIcon
              color="inherit"
              fontSize="small"
              className={styles.deleteBtn}
            />
          </IconButton>
          <IconButton aria-label="delete" className={styles.editBtn}>
            <EditIcon color="inherit" fontSize="small" />
          </IconButton>
        </div>
      </div>
    }
  />
));

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}
