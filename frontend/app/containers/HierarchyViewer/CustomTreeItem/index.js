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
import { Collapse, Typography, IconButton, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCustomTreeItem from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.scss';
import { useState } from 'react';

export function CustomTreeItem(props) {
  useInjectReducer({ key: 'customTreeItem', reducer });
  useInjectSaga({ key: 'customTreeItem', saga });

  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false);

  const deleteClass = () => {
    console.log(`Delete `, props);
  };

  return (
    <>
      <StyledTreeItem
        {...props}
        setisDeleteDialogOpen={setisDeleteDialogOpen}
      />
      <Dialog open={isDeleteDialogOpen}>
        <DialogTitle id="id-delete-dialog">
          Delete "{props.label}" class
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete {props.label} class?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setisDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteClass} color="secondary" autoFocus>
            Delete !
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
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

// StyledTreeItem
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
    nodeId={props.nodeId}
    TransitionComponent={TransitionComponent}
    label={
      <div className={styles.root}>
        <Typography variant="body2">{props.label}</Typography>
        <div>
          <IconButton
            aria-label="delete"
            onClick={e => {
              props.setisDeleteDialogOpen(true);
              e.stopPropagation();
            }}
          >
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
